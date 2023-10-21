import { usersDbType } from "../../models/usersTypes";
import { usersCollection } from "../dataBase/blogsDb";
export const usersRepository = {
  async createUser(newUser: usersDbType): Promise<usersDbType> {
    const result = await usersCollection.insertOne({ ...newUser });
    return newUser;
  },
  async findAllUsers(
    query: object,
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
          // $or: [{ login: { $regex: /^s/i } }, { email: { $regex: /^s/i } }],
          $or: [
            { login: { $regex: `\^${searchLoginTerm}`, $options: "i" } },
            { email: { $regex: `\^${searchEmailTerm}`, $options: "i" } },
          ],
        },
        { projection: { _id: 0 } }
      )
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(+skip)
      .limit(+pageSize)
      .toArray();
  },
  async countUsers(): Promise<number> {
    return await usersCollection.countDocuments({});
  },

  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
    return user;
  },
  async deleteUser(id: string): Promise<boolean> {
    const result = await usersCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
