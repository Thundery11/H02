import { body } from "express-validator";
import { usersRepository } from "../repositories/users-repository/users-repository";

export const isEmailExist = () => {
  return [
    body("email")
      .custom(async (loginOrEmail) => {
        const result = await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!result) {
          throw new Error("User with that email doesnt registered");
        }
        if (result.emailConfirmation.isConfirmed === true) {
          throw new Error("Email already confirmed");
        }
        return true;
      })
      .withMessage("something wrong here"),
  ];
};
