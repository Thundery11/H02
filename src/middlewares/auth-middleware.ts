import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import { jwtService } from "../application/jwt-service";
import { usersService } from "../domain/users-service/users-service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.send(HTTP_STATUSES.UNAUTHORISED_401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  const userId = await jwtService.getUserById(token);
  if (userId) {
    req.user = await usersService.findUserById(userId);
    next();
    return;
  }
  res.send(HTTP_STATUSES.UNAUTHORISED_401);
};
