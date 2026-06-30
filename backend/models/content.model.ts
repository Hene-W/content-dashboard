import mongoose, { Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  description?: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Facebook" | "Twitter" | "Blog";
  status: "à faire" | "en cours" | "publié";
  scheduledDate?: Date;
}

export type ContentInput = Omit<IContent, keyof Document>;

const contentSchema = new mongoose.Schema<IContent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  platform: {
    type: String,
    enum: ["YouTube", "Instagram", "TikTok", "Facebook", "Twitter", "Blog"],
    required: true,
  },
  status: {
    type: String,
    enum: ["à faire", "en cours", "publié"],
    default: "à faire",
  },
  scheduledDate : {
    type: Date,
  },
}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);
export default Content;