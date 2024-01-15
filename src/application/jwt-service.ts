import { usersDbType } from "../models/usersTypes";
import jwt from "jsonwebtoken";
import { settings } from "../settings";

export const jwtService = {
  async createJWT(user: usersDbType) {
    const token = jwt.sign({ userId: user.id }, settings.JWT_SECRET, {
      expiresIn: "100m",
    });
    return token;
  },
  async createRefreshToken(user: usersDbType, deviceId: string) {
    const refreshToken = jwt.sign(
      { userId: user.id, deviceId: deviceId },
      settings.REFRESH_TOKEN_SECRET,
      { expiresIn: "100h" }
    );
    return refreshToken;
  },
  async verifyRefreshToken(refreshToken: string) {
    const result: any = jwt.verify(refreshToken, settings.REFRESH_TOKEN_SECRET);
    return result;
  },
  async getUserByToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);
      return result.userId;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
