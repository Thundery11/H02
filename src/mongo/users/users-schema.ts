import mongoose from "mongoose";
import { usersDbType } from "../../models/usersTypes";
import { WithId } from "mongodb";

export const UsersSchema = new mongoose.Schema<WithId<usersDbType>>({
  id: { type: String, required: true },
  accountData: {
    login: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  emailConfirmation: {
    confirmationCode: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    isConfirmed: { type: Boolean, required: true },
  },
});
