import { LoginAttempsType } from "../../models/authTypes";
import { usersRepository } from "../../repositories/users-repository/users-repository";
export const authService = {
  async confirmEmail(code: string): Promise<boolean> {
    const user = await usersRepository.findUserByConfirmationCode(code);
    if (!user) return false;
    if (user.emailConfirmation.expirationDate < new Date()) return false;
    if (user.emailConfirmation.confirmationCode !== code) return false;
    if (user.emailConfirmation.isConfirmed === true) return false;
    const result = await usersRepository.updateConfirmation(user.id);
    return result;
  },
  // async loginInfo(ip_address: string): Promise<LoginAttempsType>{
  //   const loginInfo = {
  //     ip_address: ip_address,
  //     loginDate: new Date()
  //   }
  // }
};
