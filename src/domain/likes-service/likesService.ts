import { injectable } from "inversify";
import {
  LastLikedOutputType,
  LastLikedType,
  LikesType,
  MyStatus,
} from "../../models/likesTypes";
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

  async lastLiked(userId: string, login: string, postId: string) {
    const addetdAt = new Date().toISOString();
    const lastLiked = new LastLikedType(addetdAt, userId, login, postId);
    const reaciton = await this.likesRepository.isItFirstLike(userId, postId);
    console.log(reaciton);
    if (!reaciton) {
      await this.likesRepository.lastLiked(lastLiked);
    }

    // const res = await this.getLastLikes(postId);

    // const fu = res.map((m) => m.login);
    // console.log(res);
    // console.log(fu);
    // return res;
  }
  async deleteLastLiked(userId: string, postId: string): Promise<boolean> {
    return await this.likesRepository.deleteLastLiked(userId, postId);
  }
  async getLastLikes(postId: string): Promise<LastLikedOutputType[]> {
    return await this.likesRepository.getLastLikes(postId);
  }
}
