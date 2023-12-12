import { WithId } from "mongodb";
import mongoose from "mongoose";
import { CommentsDbType } from "../../models/comments-types";

export const CommentsSchema = new mongoose.Schema<WithId<CommentsDbType>>({
  postId: { type: String, required: true },
  id: { type: String, required: true },
  content: { type: String, required: true },
  commentatorInfo: {
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
  },
  createdAt: { type: String, required: true },
});
