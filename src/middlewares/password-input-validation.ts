import { body } from "express-validator";

export const passwordInputValidation = () => {
  return [
    body("password")
      .isString()
      .bail()
      .trim()
      .notEmpty()
      .bail()
      .isLength({ min: 6, max: 20 })
      .bail()
      .withMessage("incorrect password"),
  ];
};
