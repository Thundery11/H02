import { WithId } from "mongodb";
import mongoose from "mongoose";
import { CommentsType } from "../../models/comments-types";

export const CommentsSchema = new mongoose.Schema<CommentsType>({
  postId: { type: String, required: true },
  id: { type: String, required: true },
  content: { type: String, required: true },
  commentatorInfo: {
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
  },
  createdAt: { type: String, required: true },
  likesInfo: {
    likesCount: { type: Number },
    dislikesCount: { type: Number },
    myStatus: { type: String },
  },
});
