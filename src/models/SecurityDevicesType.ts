import { WithId } from "mongodb";

export type SecurityDevicesType = WithId<{
  userId: string;
  ip: string;
  title: string;
  lastActiveDate: string;
  deviceId: string;
}>;
