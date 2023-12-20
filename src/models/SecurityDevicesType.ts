import { WithId } from "mongodb";

export type SecurityDevicesType = {
  userId: string;
  ip: string | string[];
  title: string;
  lastActiveDate: string;
  deviceId: string;
};
