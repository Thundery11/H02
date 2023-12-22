import { LikesType, MyStatus } from "../../models/likesTypes";
import { LikesModel } from "../dataBase/blogsDb";

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
    _myStatus: string
  ): Promise<boolean> {
    const result = await LikesModel.updateOne(
      { userId: userId, parentId: _parentId },
      { myStatus: _myStatus }
    );
    return result.modifiedCount === 1;
  }
}
