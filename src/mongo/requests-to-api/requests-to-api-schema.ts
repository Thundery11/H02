import { WithId } from "mongodb";
import mongoose from "mongoose";
import { RequestsToApiType } from "../../models/requests-to-api-types";
export const RequestsToApiSchema = new mongoose.Schema<RequestsToApiType>({
  IP: { type: String, required: true },
  URL: { type: String, required: true },
  date: { type: Date, required: true },
});
