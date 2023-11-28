import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";
import { blackRefreshTokensCollection } from "../dataBase/blogsDb";

export const blackRefreshTokensRepository = {
  async findBlackRefreshToken(
    refreshToken: string
  ): Promise<BlackRefreshTokensType | null> {
    return await blackRefreshTokensCollection.findOne({
      refreshToken: refreshToken,
    });
  },
  async updateBlackListTokens(refreshToken: string) {
    return await blackRefreshTokensCollection.insertOne({ refreshToken });
  },
};
