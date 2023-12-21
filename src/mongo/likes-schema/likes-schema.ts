import mongoose from "mongoose";
import { LikesType } from "../../models/likesTypes";

export const LikesSchema = new mongoose.Schema<LikesType>({
  userId: { type: String, required: true },
  parentId: { type: String, required: true },
  createdAt: { type: String, required: true },
  myStatus: { type: String, required: true },
});
