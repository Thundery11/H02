import { id } from "date-fns/locale";
import { CommentsOutputType } from "../../models/comments-types";
import { CommentsRepository } from "../../repositories/comments-repository/comments-repository";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";
import { MyStatus } from "../../models/likesTypes";
import { injectable } from "inversify";
@injectable()
export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected likesRepository: LikesRepository
  ) {}
  async getComment(
    _parentId: string,
    userId: string | null
  ): Promise<CommentsOutputType | null> {
    const dislikesCount = await this.likesRepository.countDislikes(_parentId);
    const likesCount = await this.likesRepository.countLikes(_parentId);
    const comment = await this.commentsRepository.getComment(_parentId);
    const reaction = userId
      ? await this.likesRepository.whatIsMyStatus(userId, _parentId)
      : null;
    //dobavit comment ID
    console.log(`myStatus ${reaction}`);
    console.log(`userId : ${userId}`);
    if (!comment) return null;

    // const result = {
    //   ...comment,
    //   likesInfo: {
    //     dislikesCount,
    //     likesCount,
    //     myStatus: reaction ? reaction.myStatus : "None",
    //   },
    // };

    comment.likesInfo.dislikesCount = dislikesCount;
    comment.likesInfo.likesCount = likesCount;
    if (reaction === null) {
      comment.likesInfo.myStatus = MyStatus.None;
    } else {
      comment.likesInfo.myStatus = reaction?.myStatus;
    }
    console.log(reaction);
    return comment;
  }

  async deleteComment(commentId: string): Promise<boolean> {
    return await this.commentsRepository.deleteComment(commentId);
  }

  async changeComment(commentId: string, content: string): Promise<boolean> {
    return await this.commentsRepository.changeComment(commentId, content);
  }
}
