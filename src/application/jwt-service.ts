import { usersDbType } from "../models/usersTypes";
import jwt from "jsonwebtoken";
import { settings } from "../settings";
import { uuid } from "uuidv4";

export const jwtService = {
  async createJWT(user: usersDbType) {
    const token = jwt.sign({ userId: user.id }, settings.JWT_SECRET, {
      expiresIn: "10m",
    });
    return token;
  },
  async createRefreshToken(user: usersDbType, deviceId: string) {
    const refreshToken = jwt.sign(
      { userId: user.id, deviceId: deviceId },
      settings.REFRESH_TOKEN_SECRET,
      { expiresIn: "360h" }
    );
    return refreshToken;
  },
  async verifyRefreshToken(refreshToken: string) {
    const result: any = jwt.verify(refreshToken, settings.REFRESH_TOKEN_SECRET);
    console.log(result.userId);
    return result;
  },
  async getUserByToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);
      console.log(`result for userId : ${result}`);
      return result.userId;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
