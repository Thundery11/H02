import { body } from "express-validator";

export const resendingEmailInputValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .bail()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .withMessage("invalid email"),
  ];
};
