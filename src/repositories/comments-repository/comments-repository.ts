import { CommentsOutputType } from "../../models/comments-types";
import { CommentsModel } from "../dataBase/blogsDb";
export class CommentsRepository {
  async getComment(commentId: string): Promise<CommentsOutputType | null> {
    return await CommentsModel.findOne(
      { id: commentId },
      { _id: 0, postId: 0, __v: 0 }
    );
  }
  async deleteComment(commentId: string): Promise<boolean> {
    const result = await CommentsModel.deleteOne({ id: commentId });
    return result.deletedCount === 1;
  }

  async changeComment(commentId: string, content: string): Promise<boolean> {
    const result = await CommentsModel.updateOne(
      { id: commentId },
      { content: content }
    );
    return result.matchedCount === 1;
  }
}
