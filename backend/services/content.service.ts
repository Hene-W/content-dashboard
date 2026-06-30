import Content, { IContent } from "../models/content.model";

export const createContentService = async (contentData: IContent, ): Promise<IContent> => {
  const content = await Content.create(contentData);
  return content;
};

export const getAllContentService = async (): Promise<IContent[]> => {
    const contents = await Content.find()
    return contents;
}

export const getOneContentService = async (contentId: string): Promise<IContent | null> => {
    const content = await Content.findById(contentId)
    if (!content) {
        throw new Error("Content not found");
    }

    return content;
}

export const updateContentService = async (contentId: string, contentData: Partial<IContent>): Promise<IContent | null> => {
    const updatedContent = await Content.findByIdAndUpdate(contentId, contentData, { new: true });
    if (!updatedContent) {
        throw new Error("Content not found");
    }
    
    return updatedContent;
}

export const deleteContentService = async (contentId: string): Promise<IContent | null> => {
    const deletedContent = await Content.findByIdAndDelete(contentId)
    if (!deletedContent) {
        throw new Error("Content not found");
    }

    return deletedContent;
}