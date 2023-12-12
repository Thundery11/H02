import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";
import { BlackRefreshTokenModel } from "../dataBase/blogsDb";

export const blackRefreshTokensRepository = {
  async findBlackRefreshToken(
    refreshToken: string
  ): Promise<BlackRefreshTokensType | null> {
    return await BlackRefreshTokenModel.findOne({
      refreshToken: refreshToken,
    });
  },
  async updateBlackListTokens(refreshToken: string) {
    return await BlackRefreshTokenModel.insertMany({ refreshToken });
  },
};
