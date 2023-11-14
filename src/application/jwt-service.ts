import { usersDbType } from "../models/usersTypes";
import jwt from "jsonwebtoken";
import { settings } from "../settings";

export const jwtService = {
  async createJWT(user: usersDbType) {
    const token = jwt.sign({ userId: user.id }, settings.JWT_SECRET, {
      expiresIn: "100000h",
    });
    return token;
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
