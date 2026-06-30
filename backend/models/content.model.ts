import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
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