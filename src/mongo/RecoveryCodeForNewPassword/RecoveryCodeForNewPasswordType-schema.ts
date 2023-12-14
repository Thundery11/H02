import mongoose from "mongoose";
import { RecoveryCodeForNewPasswordType } from "../../models/passowrdRecovery-types";

export const RecoveryCodeForNewPasswordSchema =
  new mongoose.Schema<RecoveryCodeForNewPasswordType>({
    email: { type: String, required: true },
    recoveryCode: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  });
