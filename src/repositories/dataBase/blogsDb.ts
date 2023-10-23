import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { blogsDbType } from "../../models/blogsTypes";
import { postsDbType } from "../../models/postsTypes";
import { usersDbType } from "../../models/usersTypes";
import { CommentsDbType } from "../../models/comments-types";

dotenv.config();

// const mongoUri = "mongodb://0.0.0.0:27017";
const mongoUri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
if (!mongoUri) {
  throw new Error(`! Url doesn't found`);
}
export const client = new MongoClient(mongoUri);
const blogsDb = client.db("blogsDb");
const postsDb = client.db("postsDb");
const usersDb = client.db("users");
const commentsDb = client.db("comments");
export const postsCollection = postsDb.collection<postsDbType>("posts");
export const blogsCollection = blogsDb.collection<blogsDbType>("blogs");
export const usersCollection = usersDb.collection<usersDbType>("users");
export const commentsCollection =
  commentsDb.collection<CommentsDbType>("comments");

export async function runDb() {
  try {
    await client.connect();
    await client.db("blogsDb").command({ ping: 1 });
    console.log("Connected succesfully to mongo server");
  } catch {
    console.log("Can't connect to mongo server");
    await client.close();
  }
}
