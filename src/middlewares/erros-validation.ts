import { NextFunction, Request, Response } from "express";
import {
  validationResult,
  ValidationError,
  ErrorFormatter,
} from "express-validator";
import { HTTP_STATUSES } from "../models/statuses";

const ErrorFormatter = (error: ValidationError) => {
  switch (error.type) {
    case "field":
      return {
        message: error.msg,
        field: error.path,
      };
    default:
      return {
        message: error.msg,
        field: "none",
      };
  }
};

export const errosValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    const errorsMessages = {
      errorsMessages: errors.array().map(ErrorFormatter),
    };

    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsMessages);
    return;
  } else {
    next();
  }
};
