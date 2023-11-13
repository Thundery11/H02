import { usersDbType, usersOutputType } from "../../models/usersTypes";
import { v4 as uuidv4 } from "uuid";
import add from "date-fns/add";
import bcrypt from "bcrypt";
import { usersRepository } from "../../repositories/users-repository/users-repository";
import { emailsManager } from "../../managers/emails-manager";
export const usersService = {
  async findAllUsers(
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<usersOutputType[]> {
    const foundUser = await usersRepository.findAllUsers(
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    const result = foundUser.map((m) => {
      return {
        id: m.id,
        login: m.accountData.login,
        email: m.accountData.email,
        createdAt: m.accountData.createdAt,
      };
    });
    return result;
  },

  async findUserById(id: string): Promise<usersDbType | null> {
    return usersRepository.findUserById(id);
  },
  async countUsers(
    searchLoginTerm: string,
    searchEmailTerm: string
  ): Promise<number> {
    return await usersRepository.countUsers(searchLoginTerm, searchEmailTerm);
  },
  async createUser(
    login: string,
    email: string,
    password: string
  ): Promise<usersOutputType | string | null> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const createdAt = new Date();

    const newUser: usersDbType = {
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
    console.log(newUser.emailConfirmation.confirmationCode);
    const isLoginExists = await usersRepository.findByLoginOrEmail(
      newUser.accountData.login
    );
    if (isLoginExists !== null) {
      return "login exists";
    }
    const isEmailExists = await usersRepository.findByLoginOrEmail(
      newUser.accountData.email
    );
    if (isEmailExists !== null) {
      return "email exists";
    }
    try {
      await emailsManager.sendEmailConfirmationMessage(newUser);
    } catch (error) {
      console.error(error);
      await usersRepository.deleteUser(newUser.id);
      return null;
    }
    await usersRepository.createUser(newUser);

    return {
      id: newUser.id,
      login: newUser.accountData.login,
      email: newUser.accountData.email,
      createdAt: newUser.accountData.createdAt,
    };
  },
  async deleteUser(id: string): Promise<boolean> {
    return await usersRepository.deleteUser(id);
  },

  async checkCredantials(loginOrEmail: string, password: string) {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    if (user.emailConfirmation.isConfirmed === false) return false;
    const passwordHash = await this._generateHash(
      password,
      user.accountData.passwordSalt
    );
    if (user.accountData.passwordHash !== passwordHash) {
      return false;
    }
    return user;
  },
  async resendEmailConfirmationCode(
    loginOrEmail: string
  ): Promise<usersDbType | null> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return null;
    if (user.emailConfirmation.isConfirmed === true) return null;
    if (user.emailConfirmation.isConfirmed === false) {
      user.emailConfirmation.confirmationCode = uuidv4();
      try {
        await emailsManager.sendEmailConfirmationMessage(user);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return user;
  },

  async _generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
