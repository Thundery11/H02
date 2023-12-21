import { LikesType, MyStatus } from "../../models/likesTypes";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";

export class LikesService {
  constructor(protected likesRepository: LikesRepository) {}

  async addLike(
    userId: string,
    _parentId: string,
    _mystatus: string
  ): Promise<boolean> {
    const likeDbModel = new LikesType(
      userId,
      _parentId,
      new Date().toISOString(),
      _mystatus
    );
    console.log(likeDbModel);
    return await this.likesRepository.addLike(likeDbModel);
  }
}
