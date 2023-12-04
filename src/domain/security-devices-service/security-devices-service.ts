import { jwtService } from "../../application/jwt-service";
import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { securityDevicesRepository } from "../../repositories/security-devices-repository/securityDevices-repository";

export const securityDevicesService = {
  async addDevice(device: SecurityDevicesType) {
    return await securityDevicesRepository.addNewDevice(device);
  },
  async getDevices(userId: string): Promise<SecurityDevicesType[]> {
    return await securityDevicesRepository.getDevices(userId);
  },
  async updateLastActiveDate(
    deviceId: string,
    lastActiveDate: string
  ): Promise<boolean> {
    return await securityDevicesRepository.updateLastActiveDate(
      deviceId,
      lastActiveDate
    );
  },
  async terminateOtherSessions(deviceId: string): Promise<boolean> {
    return await securityDevicesRepository.terminateOtherSessions(deviceId);
  },
};
