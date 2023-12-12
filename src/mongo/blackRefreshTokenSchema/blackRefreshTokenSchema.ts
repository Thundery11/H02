import { WithId } from "mongodb";
import mongoose from "mongoose";
import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";

export const blackRefreshTokenSchema = new mongoose.Schema<
  WithId<BlackRefreshTokensType>
>({
  refreshToken: { type: String, required: true },
});
