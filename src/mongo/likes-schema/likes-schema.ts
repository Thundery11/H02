import mongoose, { Document } from "mongoose";
import { LastLikedType, LikesType, MyStatus } from "../../models/likesTypes";
interface LikesSchema extends Document {
  myStatus: MyStatus;
}
export const LikesSchema = new mongoose.Schema<LikesType>({
  userId: { type: String, required: true },
  parentId: { type: String, required: true },
  createdAt: { type: String, required: true },
  myStatus: {
    type: String,
    enum: MyStatus,
    default: MyStatus.None,
    required: true,
  },
});

export const LastLikedSchema = new mongoose.Schema<LastLikedType>({
  addedAt: { type: String, required: true },
  userId: { type: String, required: true },
  login: { type: String, required: true },
  postId: { type: String, required: true },
});
