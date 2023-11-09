import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import add from "date-fns/add";
import { usersService } from "../users-service/users-service";
import { usersRepository } from "../../repositories/users-repository/users-repository";
import { UserAcountDbType } from "../../models/usersTypes";
export const authService = {
  async createUser(
    login: string,
    email: string,
    password: string
  ): Promise<UserAcountDbType> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);
    const createdAt = new Date();
    const user = {
      id: Math.floor(Math.random() * 10000).toString(),
      accountData: {
        login: login,
        email: email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        createdAt: createdAt.toISOString(),
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 3,
          minutes: 3,
        }),
        isConfirmed: false,
      },
    };
    const createResult = usersRepository.saveUser(user);
    const outputUser = {
      id: user.id,
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt,
    };
    return createResult;
  },

  async _generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};