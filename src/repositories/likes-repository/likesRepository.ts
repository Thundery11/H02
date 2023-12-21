import { LikesType } from "../../models/likesTypes";
import { LikesModel } from "../dataBase/blogsDb";

export class LikesRepository {
  constructor() {}
  async addLike(likeDbModel: LikesType): Promise<boolean> {
    try {
      const result = await LikesModel.insertMany({ ...likeDbModel });
      return true;
    } catch (error) {
      console.error();
      return false;
    }
  }
}
