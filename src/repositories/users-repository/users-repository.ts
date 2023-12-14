import { RecoveryCodeForNewPasswordType } from "../../models/passowrdRecovery-types";
import { usersDbType } from "../../models/usersTypes";
import {
  RecoveryCodeForNewPasswordModel,
  UserModel,
} from "../dataBase/blogsDb";
export const usersRepository = {
  async createUser(newUser: usersDbType): Promise<usersDbType> {
    const result = await UserModel.insertMany({ ...newUser });
    return newUser;
  },

  async findAllUsers(
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<usersDbType[]> {
    return await UserModel.find(
      {
        $or: [
          { "accountData.login": { $regex: searchLoginTerm, $options: "i" } },
          { "accountData.email": { $regex: searchEmailTerm, $options: "i" } },
        ],
      },
      { _id: 0, __v: 0 }
    )
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean();
  },
  async findUserByConfirmationCode(code: string): Promise<usersDbType | null> {
    return await UserModel.findOne({
      "emailConfirmation.confirmationCode": code,
    });
  },
  async findUserById(id: string): Promise<usersDbType | null> {
    return await UserModel.findOne(
      { id: id },
      { _id: 0, passwordSalt: 0, passwordHash: 0, createdAt: 0, __v: 0 }
    );
  },

  async countUsers(
    searchLoginTerm: string,
    searchEmailTerm: string
  ): Promise<number> {
    return await UserModel.countDocuments({
      $or: [
        { "accountData.login": { $regex: searchLoginTerm, $options: "i" } },
        { "accountData.email": { $regex: searchEmailTerm, $options: "i" } },
      ],
    });
  },

  async findByLoginOrEmail(loginOrEmail: string): Promise<usersDbType | null> {
    const user = await UserModel.findOne({
      $or: [
        { "accountData.email": loginOrEmail },
        { "accountData.login": loginOrEmail },
      ],
    });
    return user;
  },
  async updateConfirmation(id: string): Promise<boolean> {
    const result = await UserModel.updateOne(
      { id },
      { "emailConfirmation.isConfirmed": true }
    );
    return result.modifiedCount === 1;
  },
  async updateConfirmationCode(
    id: string,
    confirmationCode: string
  ): Promise<boolean> {
    const result = await UserModel.updateOne(
      { id },
      { "emailConfirmation.confirmationCode": confirmationCode }
    );
    return result.modifiedCount === 1;
  },
  async deleteUser(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
  async sendPasswordRecoveryCode(
    recoveryCodeForNewPassword: RecoveryCodeForNewPasswordType
  ): Promise<RecoveryCodeForNewPasswordType> {
    const result = await RecoveryCodeForNewPasswordModel.insertMany({
      ...recoveryCodeForNewPassword,
    });
    return recoveryCodeForNewPassword;
  },
};
