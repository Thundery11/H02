import { CommentsOutputType } from "../../models/comments-types";
import { commentsCollection } from "../dataBase/blogsDb";

export const commentsRepository = {
  async getComment(commentId: string): Promise<CommentsOutputType | null> {
    return await commentsCollection.findOne(
      { id: commentId },
      { projection: { _id: 0, postId: 0 } }
    );
  },
};
