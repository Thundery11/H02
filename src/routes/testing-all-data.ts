import { Request, Response, Router } from "express";
import {
  blogsCollection,
  postsCollection,
  usersCollection,
} from "../repositories/dataBase/blogsDb";

export const testingAllDataRouter = Router({});

testingAllDataRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});
  res.send(204);
});
