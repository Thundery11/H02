import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import { jwtService } from "../application/jwt-service";
import { usersService } from "../domain/users-service/users-service";
import { sesionService } from "../domain/session-service/session-service";

export const checkRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
  }

  try {
    const result = await jwtService.verifyRefreshToken(refreshToken);
    console.log(result);
    if (result.userId) {
      const user = await usersService.findUserById(result.userId);
      if (!user) {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
      }
      const isInBlackList = await sesionService.findBlackRefreshToken(
        refreshToken
      );
      if (refreshToken === isInBlackList?.refreshToken) {
        return res
          .status(HTTP_STATUSES.UNAUTHORISED_401)
          .send("Isn't valid token");
      }

      req.user = user;

      next();
      return;
    }
  } catch (e) {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
  }
};
