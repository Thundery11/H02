import { emailAdapter } from "../adapters/email-adapter";
import { UserAcountDbType } from "../models/usersTypes";

export const emailsManager = {
  async sendEmailConfirmationMessage(user: UserAcountDbType) {
    const message = `<h1>Thank for your registration</h1><p>To finish registration please follow the link below:<a href='https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}'>complete registration</a> </p>`;
    await emailAdapter.sendEmail(user.accountData.email, message);
  },
};
