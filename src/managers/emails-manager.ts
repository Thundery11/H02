import { emailAdapter } from "../adapters/email-adapter";
import { RecoveryCodeForNewPasswordType } from "../models/passowrdRecovery-types";
import { usersDbType } from "../models/usersTypes";

export const emailsManager = {
  async sendEmailConfirmationMessage(user: usersDbType) {
    const message = `<h1>Thank for your registration</h1><p>To finish registration please follow the link below:<a href='https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}'>complete registration</a> </p>`;
    await emailAdapter.sendEmail(user.accountData.email, message);
  },
  async sendPasswordRecoveryCode(
    recoveryCodeForNewPassword: RecoveryCodeForNewPasswordType
  ) {
    const message = ` <h1>Password recovery</h1><p>To finish password recovery please follow the link below:<a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCodeForNewPassword.recoveryCode}'>recovery password</a></p>`;
    await emailAdapter.sendEmail(recoveryCodeForNewPassword.email, message);
  },
};
