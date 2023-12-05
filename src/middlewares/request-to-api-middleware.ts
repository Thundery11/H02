import { NextFunction, Request, Response } from "express";
import { requestsToApiService } from "../domain/requests-to-api-service";
import { HTTP_STATUSES } from "../models/statuses";

export const requestsToApiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const IP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const URL = req.originalUrl;
  const date = new Date();
  const requestToApi = { IP: IP, URL: req.originalUrl, date: date };
  await requestsToApiService.addRequestToApi(requestToApi);
  const requestsToApiArray = await requestsToApiService.getRequestsToApi(
    IP,
    URL
  );
  const filtered = requestsToApiArray?.filter(
    (s) => s.date <= new Date(new Date().getTime() + 10000)
  );
  if (filtered?.length > 5) {
    res.sendStatus(HTTP_STATUSES.TOO_MANY_REQUESTS_429);
    return;
  }
  console.log(requestsToApiArray);

  next();
  return;
};
