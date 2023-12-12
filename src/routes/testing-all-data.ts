import { Request, Response, Router } from "express";
import {
  BlogModel,
  CommentsModel,
  PostModel,
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
  res.send(204);
});
