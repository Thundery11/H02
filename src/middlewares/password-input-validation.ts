import { body } from "express-validator";

export const passwordInputValidation = () => {
  return [
    body("newPassword")
      .isString()
      .bail()
      .trim()
      .notEmpty()
      .bail()
      .isLength({ min: 6, max: 20 })
      .bail()
      .withMessage("incorrect password"),
    body("recoveryCode")
      .isUUID()
      .bail()
      .isString()
      .withMessage("incorrect recovery code"),
  ];
};
