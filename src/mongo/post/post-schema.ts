import mongoose from "mongoose";
import { postsDbType } from "../../models/postsTypes";
import { WithId } from "mongodb";

export const PostSchema = new mongoose.Schema<postsDbType>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
  blogName: { type: String, required: true },
  createdAt: { type: String, required: true },
});
