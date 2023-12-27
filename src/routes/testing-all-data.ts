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
  await BlogModel.deleteMany({});
  await PostModel.deleteMany({});
  await UserModel.deleteMany({});
  await CommentsModel.deleteMany({});
  await SecurityDevicesModel.deleteMany({});
  await RequestsToApiModel.deleteMany({});
  await RecoveryCodeForNewPasswordModel.deleteMany({});
  await LikesModel.deleteMany({});
  res.send(204);
});
//sss
