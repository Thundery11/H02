import { usersDbType } from "../../models/usersTypes";
import { usersCollection } from "../dataBase/blogsDb";
export const usersRepository = {
  async createUser(newUser: usersDbType): Promise<usersDbType> {
    const result = await usersCollection.insertOne({ ...newUser });
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
    return await usersCollection
      .find(
        {
          $or: [
            { "accountData.login": { $regex: searchLoginTerm, $options: "i" } },
            { "accountData.email": { $regex: searchEmailTerm, $options: "i" } },
          ],
        },
        { projection: { _id: 0 } }
      )
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(+skip)
      .limit(+pageSize)
      .toArray();
  },
  async findUserByConfirmationCode(code: string): Promise<usersDbType | null> {
    return await usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });
  },
  async findUserById(id: string): Promise<usersDbType | null> {
    return await usersCollection.findOne(
      { id: id },
      { projection: { _id: 0, passwordSalt: 0, passwordHash: 0, createdAt: 0 } }
    );
  },

  async countUsers(
    searchLoginTerm: string,
    searchEmailTerm: string
  ): Promise<number> {
    return await usersCollection.countDocuments({
      $or: [
        { "accountData.login": { $regex: searchLoginTerm, $options: "i" } },
        { "accountData.email": { $regex: searchEmailTerm, $options: "i" } },
      ],
    });
  },

  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await usersCollection.findOne({
      $or: [
        { "accountData.email": loginOrEmail },
        { "accountData.login": loginOrEmail },
      ],
    });
    return user;
  },
  async updateConfirmation(id: string): Promise<boolean> {
    const result = await usersCollection.updateOne(
      { id },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    return result.modifiedCount === 1;
  },
  async updateConfirmationCode(
    id: string,
    confirmationCode: string
  ): Promise<boolean> {
    const result = await usersCollection.updateOne(
      { id },
      { $set: { "emailConfirmation.confirmationCode": confirmationCode } }
    );
    return result.modifiedCount === 1;
  },
  async deleteUser(id: string): Promise<boolean> {
    const result = await usersCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
