import mongoose from "mongoose";
import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { WithId } from "mongodb";

export const SecurityDevicesSchema = new mongoose.Schema<SecurityDevicesType>({
  userId: { type: String, required: true },
  ip: { type: String, required: true },
  title: { type: String, required: true },
  lastActiveDate: { type: String, required: true },
  deviceId: { type: String, required: true },
});
