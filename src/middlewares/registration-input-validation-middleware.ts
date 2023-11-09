import { body } from "express-validator";

export const registrationInputValidation = () => {
  return [
    body("login")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 3, max: 10 })
      .bail()
      .matches(/^[a-zA-Z0-9_-]*$/)
      .withMessage("Incorrect login"),

    body("password")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 6, max: 20 })
      .bail()
      .withMessage("Incorrect password"),

    body("email")
      .trim()
      .notEmpty()
      .bail()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  ];
};
