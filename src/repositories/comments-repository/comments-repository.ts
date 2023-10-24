import { CommentsOutputType } from "../../models/comments-types";
import { commentsCollection } from "../dataBase/blogsDb";

export const commentsRepository = {
  async getComment(commentId: string): Promise<CommentsOutputType | null> {
    return await commentsCollection.findOne(
      { id: commentId },
      { projection: { _id: 0, postId: 0 } }
    );
  },
  async deleteComment(commentId: string): Promise<boolean> {
    const result = await commentsCollection.deleteOne({ id: commentId });
    return result.deletedCount === 1;
  },

  async changeComment(commentId: string, content: string): Promise<boolean> {
    const result = await commentsCollection.updateOne(
      { id: commentId },
      { $set: { content: content } }
    );
    return result.matchedCount === 1;
  },
};
