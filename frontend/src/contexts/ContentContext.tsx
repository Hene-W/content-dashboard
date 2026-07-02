import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { createContentService, deleteContentService, getAllContentService, getOneContentService, updateContentService } from "../services/content.service"
import { toast } from "sonner"

interface ContentContextType {
    contentList: any[]
    setContentList: React.Dispatch<React.SetStateAction<any[]>>
    selectedContent: any
    setSelectedContent: React.Dispatch<React.SetStateAction<any>>
    createContent: (contentData: object) => Promise<any | boolean>
    getContentById: (id: string) => Promise<any | boolean>
    updateContent: (id: string, contentData: object) => Promise<any | boolean>
    deleteContent: (id: string) => Promise<boolean>
}

const ContentContext = createContext<ContentContextType | null>(null)

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [contentList, setContentList] = useState<any[]>([])
    const [selectedContent, setSelectedContent] = useState<any>(null)

    const {isAuthenticated} = useAuth()

    useEffect(() => {
        const fetchContent = async (): Promise<any | boolean> => {
            try {
                const result = await getAllContentService()
                setContentList(result)
                return result
            } catch (error:unknown) {
                const message = error instanceof Error ? error.message : "An unknown error occurred";
                console.error("Error fetching content:", message);
                toast.error("Erreur lors de la récupération du contenu. Veuillez réessayer plus tard.");
                return false
            }
        }

        if (isAuthenticated) {
            fetchContent();
        }
    }, [isAuthenticated])

    const createContent = async (contentData: object): Promise<any | boolean> => {
        try {
            const newContent = await createContentService(contentData)
            setContentList((prev) => [newContent, ...prev])
            return newContent
        } catch (error:unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("Error creating content:", message);
            toast.error("Erreur lors de la création du contenu. Veuillez réessayer plus tard.");
            return false
        }
    }

    const getContentById = async (id: string): Promise<any | boolean> => {
        try {
            const content = await getOneContentService(id)
            setSelectedContent(content)
            return content
        } catch (error:unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("Error fetching content by ID:", message);
            toast.error("Erreur lors de la récupération du contenu. Veuillez réessayer plus tard.");
            return false
        }
    }

    const updateContent = async (id: string, contentData: object): Promise<any | boolean> => {
        try {
            const updatedContent = await updateContentService(id, contentData)
            setContentList((prev) => prev.map((content) => (content._id === id ? updatedContent : content)))
            setSelectedContent(updatedContent)
            return updatedContent
        } catch (error:unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("Error updating content:", message);
            toast.error("Erreur lors de la mise à jour du contenu. Veuillez réessayer plus tard.");
            return false
        }
    }

    const deleteContent = async (id: string): Promise<boolean> => {
        try {
            await deleteContentService(id)
            setContentList((prev) => prev.filter((content) => content._id !== id))
            setSelectedContent(null)
            return true
        } catch (error:unknown) {
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            console.error("Error deleting content:", message);
            toast.error("Erreur lors de la suppression du contenu. Veuillez réessayer plus tard.");
            return false
        }
    }

    return (
        <ContentContext.Provider value={{ contentList, setContentList, selectedContent, setSelectedContent, createContent, getContentById, updateContent, deleteContent }}>
            {children}
        </ContentContext.Provider>
    )
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};