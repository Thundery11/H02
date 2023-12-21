import { body } from "express-validator";
import { MyStatus } from "../models/likesTypes";

export const likesInputValidation = () => {
  return [body("likeStatus").isString().withMessage("invalid likes status")];
};
