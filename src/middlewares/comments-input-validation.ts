import { body } from "express-validator";

export const commentsInputValidation = () => {
  return [
    body("content")
      .trim()
      .isString()
      .bail()
      .isLength({ min: 20, max: 300 })
      .bail()
      .withMessage("invalid content"),
  ];
};
