import { body } from "express-validator";

export const authInputValidation = () => {
  return [
    body("loginOrEmail")
      .isString()
      .bail()
      .withMessage("loginOrEmail is not a string"),

    body("password").isString().bail().withMessage("password is not a string"),
  ];
};
