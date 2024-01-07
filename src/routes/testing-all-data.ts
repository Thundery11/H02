import { Request, Response, Router } from "express";
import {
  BlogModel,
  CommentsModel,
  LikesModel,
  PostModel,
  RecoveryCodeForNewPasswordModel,
  RequestsToApiModel,
  SecurityDevicesModel,
  UserModel,
} from "../repositories/dataBase/blogsDb";

export const testingAllDataRouter = Router({});

testingAllDataRouter.delete("/", async (req: Request, res: Response) => {
  await Promise.all([
    BlogModel.deleteMany({}),
    PostModel.deleteMany({}),
    UserModel.deleteMany({}),
    CommentsModel.deleteMany({}),
    SecurityDevicesModel.deleteMany({}),
    RequestsToApiModel.deleteMany({}),
    RecoveryCodeForNewPasswordModel.deleteMany({}),
    LikesModel.deleteMany({}),
  ]);

  res.send(204);
});
