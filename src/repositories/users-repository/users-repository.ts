import { usersDbType } from "../../models/usersTypes";
import { usersCollection } from "../dataBase/blogsDb";
export const usersRepository = {
  async createUser(newUser: usersDbType): Promise<usersDbType> {
    const result = await usersCollection.insertOne({ ...newUser });
    return newUser;
  },
  async findAllUsers(): Promise<usersDbType[]> {
    return await usersCollection.find({}, { projection: { _id: 0 } }).toArray();
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
