import api from "./api"

export const createContentService = async (contentData: object): Promise<any> => {
    const response = await api("/content", "POST", contentData)
    const data = await response.json()
    return data.data
}

export const getAllContentService = async (): Promise<any> => {
    const response = await api("/content", "GET")
    const data = await response.json()
    return data.data
}

export const getOneContentService = async (id: string): Promise<any> => {
    const response = await api(`/content/${id}`, "GET")
    const data = await response.json()
    return data.data
}

export const updateContentService = async (id: string, contentData: object): Promise<any> => {
    const response = await api(`/content/${id}`, "PATCH", contentData)
    const data = await response.json()
    return data.data
}

export const deleteContentService = async (id: string): Promise<any> => {
    const response = await api(`/content/${id}`, "DELETE")
    const data = await response.json()
    return data.message
}