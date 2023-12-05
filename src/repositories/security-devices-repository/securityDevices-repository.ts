import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { securityDevicesCollection } from "../dataBase/blogsDb";

export const securityDevicesRepository = {
  async addNewDevice(device: SecurityDevicesType) {
    const result = await securityDevicesCollection.insertOne({ ...device });
    return result;
  },
  async getDevices(userId: string): Promise<SecurityDevicesType[]> {
    return await securityDevicesCollection
      .find({ userId: userId }, { projection: { _id: 0, userId: 0 } })
      .toArray();
  },
  async updateLastActiveDate(
    deviceId: string,
    lastActiveDate: string
  ): Promise<boolean> {
    const result = await securityDevicesCollection.updateOne(
      { deviceId: deviceId },
      { $set: { lastActiveDate: lastActiveDate } }
    );
    return result.matchedCount === 1;
  },
  async terminateOtherSessions(deviceId: string): Promise<boolean> {
    const result = await securityDevicesCollection.deleteMany({
      deviceId: { $ne: deviceId },
    });
    return result.deletedCount >= 1;
  },
  async getCurrentSession(
    deviceId: string
  ): Promise<SecurityDevicesType | null> {
    return await securityDevicesCollection.findOne(
      { deviceId: deviceId },
      { projection: { _id: 0 } }
    );
  },
  async deleteCurrentSession(deviceId: string): Promise<boolean> {
    const result = await securityDevicesCollection.deleteOne({
      deviceId: deviceId,
    });
    return result.deletedCount === 1;
  },
  async deleteRefreshTokenWhenLogout(lastActiveDate: string): Promise<boolean> {
    const result = await securityDevicesCollection.deleteOne({
      lastActiveDate: lastActiveDate,
    });
    return result.deletedCount === 1;
  },
};
