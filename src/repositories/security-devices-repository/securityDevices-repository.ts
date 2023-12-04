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
};
