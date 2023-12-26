import { id } from "date-fns/locale";
import { CommentsOutputType } from "../../models/comments-types";
import { CommentsRepository } from "../../repositories/comments-repository/comments-repository";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";

export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected likesRepository: LikesRepository
  ) {}
  async getComment(
    _parentId: string,
    userId: string
  ): Promise<CommentsOutputType | null> {
    const dislikesCount = await this.likesRepository.countDislikes(_parentId);
    const likesCount = await this.likesRepository.countLikes(_parentId);
    const comment = await this.commentsRepository.getComment(_parentId);
    const myStatus = await this.likesRepository.whatIsMyStatus(userId);
    if (!comment) return null;

    comment.likesInfo.dislikesCount = dislikesCount;
    comment.likesInfo.likesCount = likesCount;
    if (myStatus === null) {
      comment.likesInfo.myStatus = "None";
    } else {
      comment.likesInfo.myStatus = myStatus?.myStatus;
    }
    return comment;
  }

  async deleteComment(commentId: string): Promise<boolean> {
    return await this.commentsRepository.deleteComment(commentId);
  }

  async changeComment(commentId: string, content: string): Promise<boolean> {
    return await this.commentsRepository.changeComment(commentId, content);
  }
}
