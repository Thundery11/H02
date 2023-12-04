import { NextFunction, Request, Response } from "express";

export const counterOfLoginRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(ip_address);
};
