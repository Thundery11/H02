import { body } from "express-validator";

export const likesInputValidation = () => {
  return [
    body("likeStatus")
      .isIn(["Like", "Dislike", "None"])
      .isString()
      .bail()
      .withMessage("invalid likes status"),
  ];
};
