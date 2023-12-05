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
  async getCurrentSession(
    deviceId: string
  ): Promise<SecurityDevicesType | null> {
    return await securityDevicesRepository.getCurrentSession(deviceId);
  },
  async deleteCurrentSession(deviceId: string): Promise<boolean> {
    return await securityDevicesRepository.deleteCurrentSession(deviceId);
  },
  async deleteRefreshTokenWhenLogout(lastActiveDate: string): Promise<boolean> {
    return await securityDevicesRepository.deleteRefreshTokenWhenLogout(
      lastActiveDate
    );
  },
  async isValidRefreshToken(
    isLastActiveDate: string
  ): Promise<SecurityDevicesType | null> {
    return await securityDevicesRepository.isValidRefreshToken(
      isLastActiveDate
    );
  },
};
