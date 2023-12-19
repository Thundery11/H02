import { CommentsOutputType } from "../../models/comments-types";
import { CommentsRepository } from "../../repositories/comments-repository/comments-repository";

export class CommentsService {
  constructor(protected commentsRepository: CommentsRepository) {}
  async getComment(commentId: string): Promise<CommentsOutputType | null> {
    return await this.commentsRepository.getComment(commentId);
  }

  async deleteComment(commentId: string): Promise<boolean> {
    return await this.commentsRepository.deleteComment(commentId);
  }

  async changeComment(commentId: string, content: string): Promise<boolean> {
    return await this.commentsRepository.changeComment(commentId, content);
  }
}
