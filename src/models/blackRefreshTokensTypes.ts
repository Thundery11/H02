import { WithId } from "mongodb";

export type BlackRefreshTokensType = WithId<{
  refreshToken: string;
}>;
