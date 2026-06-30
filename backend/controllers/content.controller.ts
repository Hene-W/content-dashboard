import { Request, Response } from "express";
import {
  createContentService,
  deleteContentService,
  getAllContentService,
  getOneContentService,
  updateContentService,
} from "../services/content.service";
import { ContentInput } from "../models/content.model";

export const createContent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      platform,
      status,
      scheduledDate,
    }: ContentInput = req.body;

    const newContent = await createContentService({
      title,
      description,
      platform,
      status,
      scheduledDate,
    });

    res
      .status(201)
      .json({ message: "Content created successfully", data: newContent });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message });
  }
};

export const getAllContent = async (req: Request, res: Response) => {
  try {
    const contentList = await getAllContentService();
    res
      .status(200)
      .json({ message: "Contents retrieved successfully", data: contentList });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const content = await getOneContentService(id);

    res
      .status(200)
      .json({ message: "Content retrieved successfully", data: content });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message });
  }
};

export const updateContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const { title, description, platform, status, scheduledDate } = req.body as Partial<ContentInput>;

        const updatedContent = await updateContentService(id, {
            title,
            description,
            platform,
            status,
            scheduledDate,
        });

        res.status(200).json({ message: "Content updated successfully", data: updatedContent });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ message });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        await deleteContentService(id);

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ message });
    }
};
