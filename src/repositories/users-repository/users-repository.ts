import {
  UserAcountDbType,
  UserForJwtService,
  usersDbType,
} from "../../models/usersTypes";
import { commentsCollection, usersCollection } from "../dataBase/blogsDb";
export const usersRepository = {
  async createUser(newUser: usersDbType): Promise<usersDbType> {
    const result = await usersCollection.insertOne({ ...newUser });
    return newUser;
  },
  // async findUserByloginOrPassword(
  //   login: string,
  //   password: string
  // ): Promise<UserAcountDbType | null> {
  //   const isUser = await usersWithEmailCollection.findOne({
  //     $or: [{ login: login }, { password: password }],
  //   });
  //   return isUser;
  // },
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
  async deleteUser(id: string): Promise<boolean> {
    const result = await usersCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
