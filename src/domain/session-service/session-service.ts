import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";
import { blackRefreshTokensRepository } from "../../repositories/users-repository/black-refresh-tokens-repository";

export const sesionService = {
  async findBlackRefreshToken(
    refreshToken: string
  ): Promise<BlackRefreshTokensType | null> {
    return await blackRefreshTokensRepository.findBlackRefreshToken(
      refreshToken
    );
  },
  async updateBlackListTokens(refreshToken: string) {
    return await blackRefreshTokensRepository.updateBlackListTokens(
      refreshToken
    );
  },
};
