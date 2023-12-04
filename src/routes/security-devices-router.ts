import { Router, Request, Response } from "express";
import { checkRefreshToken } from "../middlewares/check-refresh-token-middleware";
import { securityDevicesService } from "../domain/security-devices-service/security-devices-service";
import { HTTP_STATUSES } from "../models/statuses";
import { jwtService } from "../application/jwt-service";

export const securityDevicesRouter = Router({});

securityDevicesRouter.get(
  "/",
  checkRefreshToken,
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (userId) {
      const device = await securityDevicesService.getDevices(userId);
      res.status(HTTP_STATUSES.OK_200).send(device);
    }
  }
);
securityDevicesRouter.delete(
  "/",
  checkRefreshToken,
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (userId) {
      const refreshToken = req.cookies.refreshToken;
      const result = await jwtService.verifyRefreshToken(refreshToken);
      const deviceId = result.deviceId;
      const deletedDevices =
        await securityDevicesService.terminateOtherSessions(deviceId);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
