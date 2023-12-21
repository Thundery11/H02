import { body } from "express-validator";
import { UserModel } from "../repositories/dataBase/blogsDb";
export const emailConfirmationValidation = () => {
  return [
    body("code")
      .custom(async (code) => {
        const user = await UserModel.findOne({
          "emailConfirmation.confirmationCode": code,
        });
        if (!code) {
          throw new Error("Code doesnt exists");
        } else if (!user) {
          throw new Error("User doesnt exist");
        } else if (user.emailConfirmation.expirationDate < new Date()) {
          throw new Error("Expired code");
        } else if (user.emailConfirmation.isConfirmed === true) {
          throw new Error("Email was confirmed");
        }
        return true;
      })
      .withMessage("Something wrong with code"),
  ];
};
