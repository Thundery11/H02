import { Request, Response, Router } from "express";
import {
  blackRefreshTokensCollection,
  blogsCollection,
  commentsCollection,
  postsCollection,
  requestsToApiCollection,
  securityDevicesCollection,
  usersCollection,
} from "../repositories/dataBase/blogsDb";

export const testingAllDataRouter = Router({});

testingAllDataRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});
  await commentsCollection.deleteMany({});
  await blackRefreshTokensCollection.deleteMany({});
  await securityDevicesCollection.deleteMany({});
  await requestsToApiCollection.deleteMany({});
  res.send(204);
});
