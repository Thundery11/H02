import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import add from "date-fns/add";
import { usersRepository } from "../../repositories/users-repository/users-repository";
import { UserAcountDbType } from "../../models/usersTypes";
import { emailsManager } from "../../managers/emails-manager";
import { errorMonitor } from "events";
export const authService = {
  async saveUser(
    login: string,
    email: string,
    password: string
  ): Promise<UserAcountDbType | null> {
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
    // const isUser = await usersRepository.findUserByloginOrPassword(
    //   user.accountData.email,
    //   user.accountData.passwordHash
    // );
    // console.log(isUser);
    // if (!isUser) {
    //   const createResult = await usersRepository.saveUser(user);
    // }
    try {
      await emailsManager.sendEmailConfirmationMessage(user);
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async _generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
