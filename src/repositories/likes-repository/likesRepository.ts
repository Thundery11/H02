import { injectable } from "inversify";
import {
  LastLikedOutputType,
  LastLikedType,
  LikesType,
  MyStatus,
} from "../../models/likesTypes";
import { LastLikedModel, LikesModel } from "../dataBase/blogsDb";
import { promises } from "dns";
@injectable()
export class LikesRepository {
  constructor() {}

  async isLikeExist(
    userId: string,
    _parentId: string
  ): Promise<LikesType | null> {
    return await LikesModel.findOne(
      { userId: userId, parentId: _parentId },
      { _id: 0, __v: 0 }
    );
  }

  async addLike(likeDbModel: LikesType): Promise<boolean> {
    try {
      const result = await LikesModel.insertMany({ ...likeDbModel });
      return true;
    } catch (error) {
      console.error();
      return false;
    }
  }
  async updateLike(
    userId: string,
    _parentId: string,
    _myStatus: MyStatus
  ): Promise<boolean> {
    const result = await LikesModel.updateOne(
      { userId: userId, parentId: _parentId },
      { myStatus: _myStatus }
    );
    return result.modifiedCount === 1;
  }
  async countLikes(_parentId: string): Promise<number> {
    return await LikesModel.countDocuments({
      parentId: _parentId,
      myStatus: MyStatus.Like,
    });
  }
  async countDislikes(_parentId: string): Promise<number> {
    return await LikesModel.countDocuments({
      parentId: _parentId,
      myStatus: MyStatus.Dislike,
    });
  }
  async whatIsMyStatus(
    userId: string,
    _parentId: string
  ): Promise<LikesType | null> {
    return await LikesModel.findOne(
      { userId: userId, parentId: _parentId },
      { _id: 0, userId: 0, parentId: 0, createdAt: 0, __v: 0 }
    );
  }

  async lastLiked(lastLiked: object): Promise<boolean> {
    try {
      const result = await LastLikedModel.insertMany({ ...lastLiked });
      return true;
    } catch (error) {
      console.error();
      return false;
    }
  }
  async isItFirstLike(
    userId: string,
    postId: string
  ): Promise<LastLikedType | null> {
    return await LastLikedModel.findOne({ userId, postId });
  }
  async getLastLikes(postId: string): Promise<LastLikedOutputType[]> {
    return await LastLikedModel.find({ postId }, { _id: 0, __v: 0, postId: 0 })
      .sort({ addedAt: -1 })
      .limit(3)
      .lean();
  }
}
