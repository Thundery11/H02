import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { SecurityDevicesModel } from "../dataBase/blogsDb";

export const securityDevicesRepository = {
  async addNewDevice(device: SecurityDevicesType) {
    const result = await SecurityDevicesModel.insertMany({ ...device });
    return result;
  },
  async getDevices(userId: string): Promise<SecurityDevicesType[]> {
    return await SecurityDevicesModel.find(
      { userId: userId },
      { _id: 0, userId: 0, __v: 0 }
    ).lean();
  },
  async updateLastActiveDate(
    deviceId: string,
    lastActiveDate: string
  ): Promise<boolean> {
    const result = await SecurityDevicesModel.updateOne(
      { deviceId: deviceId },
      { lastActiveDate: lastActiveDate }
    );
    return result.matchedCount === 1;
  },
  async terminateOtherSessions(deviceId: string): Promise<boolean> {
    const result = await SecurityDevicesModel.deleteMany({
      deviceId: { $ne: deviceId },
    });
    return result.deletedCount >= 1;
  },
  async getCurrentSession(
    deviceId: string
  ): Promise<SecurityDevicesType | null> {
    return await SecurityDevicesModel.findOne(
      { deviceId: deviceId },
      { _id: 0, __v: 0 }
    );
  },
  async deleteCurrentSession(deviceId: string): Promise<boolean> {
    const result = await SecurityDevicesModel.deleteOne({
      deviceId: deviceId,
    });
    return result.deletedCount === 1;
  },
  async deleteRefreshTokenWhenLogout(lastActiveDate: string): Promise<boolean> {
    const result = await SecurityDevicesModel.deleteOne({
      lastActiveDate: lastActiveDate,
    });
    return result.deletedCount === 1;
  },
  async isValidRefreshToken(
    isLastActiveDate: string
  ): Promise<SecurityDevicesType | null> {
    return await SecurityDevicesModel.findOne({
      lastActiveDate: isLastActiveDate,
    });
  },
};
