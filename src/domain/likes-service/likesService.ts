import { LikesType, MyStatus } from "../../models/likesTypes";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";

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
    _myStatus: string
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
    _myStatus: string
  ): Promise<boolean> {
    const like = await this.likesRepository.isLikeExist(userId, _parentId);
    // if (like!.myStatus !== _myStatus) {
    //   return await this.likesRepository.updateLike(
    //     userId,
    //     _parentId,
    //     _myStatus
    //   );
    // }
    // _myStatus = "None";
    // console.log(await this.likesRepository.countLikes(_parentId));
    return await this.likesRepository.updateLike(userId, _parentId, _myStatus);
  }
}
