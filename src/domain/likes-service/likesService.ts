import { injectable } from "inversify";
import { LastLikedType, LikesType, MyStatus } from "../../models/likesTypes";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";
@injectable()
export class LikesService {
  constructor(protected likesRepository: LikesRepository) {}

  async isLikeExist(userId: string, _parentId: string): Promise<boolean> {
    const result = await this.likesRepository.isLikeExist(userId, _parentId);
    if (!result) return false;

    return true;
  }

  async addLike(
    userId: string,
    _parentId: string,
    _myStatus: MyStatus
  ): Promise<boolean> {
    const likeDbModel = new LikesType(
      userId,
      _parentId,
      new Date().toISOString(),
      _myStatus
    );

    return await this.likesRepository.addLike(likeDbModel);
  }
  async updateLike(
    userId: string,
    _parentId: string,
    _myStatus: MyStatus
  ): Promise<boolean> {
    const like = await this.likesRepository.isLikeExist(userId, _parentId);
    if (like!.myStatus !== _myStatus) {
      return await this.likesRepository.updateLike(
        userId,
        _parentId,
        _myStatus
      );
    }
    return true;

    // _myStatus = "None";
    // console.log(await this.likesRepository.countLikes(_parentId));
    // return await this.likesRepository.updateLike(userId, _parentId, _myStatus);
  }
  async lastLiked(userId: string, userLogin: string, postId: string) {
    const createdAt = new Date();
    const lastLiked = new LastLikedType(userId, userLogin, postId, createdAt);
    const reaciton = await this.likesRepository.isItFirstLike(userId, postId);
    console.log(reaciton);
    if (!reaciton) {
      await this.likesRepository.lastLiked(lastLiked);
    }
  }
}
