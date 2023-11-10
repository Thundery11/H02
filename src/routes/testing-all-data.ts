import { Request, Response, Router } from "express";
import {
  blogsCollection,
  commentsCollection,
  postsCollection,
  usersCollection,
  usersWithEmailCollection,
} from "../repositories/dataBase/blogsDb";

export const testingAllDataRouter = Router({});

testingAllDataRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  await usersCollection.deleteMany({});
  await commentsCollection.deleteMany({});
  await usersWithEmailCollection.deleteMany({});
  res.send(204);
});
