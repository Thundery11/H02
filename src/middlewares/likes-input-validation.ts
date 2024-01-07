import { body } from "express-validator";
import { MyStatus } from "../models/likesTypes";

export const likesInputValidation = () => {
  return [
    body("likeStatus")
      .isString()
      .bail()
      .trim()
      .isLength({ min: 4, max: 7 })
      .withMessage("invalid likes status"),
  ];
};
