import { Router, Request, Response } from "express";
import { checkRefreshToken } from "../middlewares/check-refresh-token-middleware";
import { securityDevicesService } from "../domain/security-devices-service/security-devices-service";
import { HTTP_STATUSES } from "../models/statuses";

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
