import { usersDbType, usersOutputType } from "../../models/usersTypes";
import bcrypt from "bcrypt";
import { usersRepository } from "../../repositories/users-repository/users-repository";
export const usersService = {
  async findAllUsers(
    query: object,
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<usersOutputType[]> {
    const foundUser = await usersRepository.findAllUsers(
      query,
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    return foundUser.map(({ passwordHash, passwordSalt, ...rest }) => ({
      ...rest,
    }));
  },
  async countUsers(): Promise<number> {
    return await usersRepository.countUsers();
  },
  async createUser(
    login: string,
    email: string,
    password: string
  ): Promise<usersOutputType> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const createdat = new Date();

    const newUser: usersDbType = {
      id: Math.floor(Math.random() * 10000).toString(),
      login: login,
      email: email,
      createdAt: createdat.toISOString(),
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
    };

    await usersRepository.createUser(newUser);

    return {
      id: newUser.id,
      login: login,
      email: email,
      createdAt: createdat.toISOString(),
    };
  },
  async deleteUser(id: string): Promise<boolean> {
    return await usersRepository.deleteUser(id);
  },

  async checkCredantials(loginOrEmail: string, password: string) {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    const passwordHash = await this._generateHash(password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) {
      return false;
    }
    return true;
  },

  async _generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
