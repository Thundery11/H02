import { usersDbType } from "../models/usersTypes";
import jwt from "jsonwebtoken";
import { settings } from "../settings";

export const jwtService = {
  async createJWT(user: usersDbType) {
    const token = jwt.sign({ userId: user.id }, settings.JWT_SECRET, {
      expiresIn: "10s",
    });
    return token;
  },
  async createRefreshToken(user: usersDbType) {
    const refreshToken = jwt.sign(
      { userId: user.id },
      settings.REFRESH_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    return refreshToken;
  },
  async verifyRefreshToken(refreshToken: string) {
    const result: any = jwt.verify(refreshToken, settings.REFRESH_TOKEN_SECRET);
    return result;
  },
  async getUserById(token: string) {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);
      console.log(result);
      return result.userId;
    } catch (error) {
      return null;
    }
  },
};
