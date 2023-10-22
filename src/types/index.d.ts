import { usersDbType } from "../models/usersTypes";

declare global {
  declare namespace Express {
    export interface Request {
      user: usersDbType | null;
    }
  }
}
