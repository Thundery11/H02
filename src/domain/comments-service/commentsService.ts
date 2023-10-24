import { CommentsOutputType } from "../../models/comments-types";
import { commentsRepository } from "../../repositories/comments-repository/comments-repository";

export const commentsService = {
  async getComment(commentId: string): Promise<CommentsOutputType | null> {
    return await commentsRepository.getComment(commentId);
  },
  async deleteComment(commentId: string): Promise<boolean> {
    return await commentsRepository.deleteComment(commentId);
  },
};
