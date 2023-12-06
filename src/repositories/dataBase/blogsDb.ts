import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { blogsDbType } from "../../models/blogsTypes";
import { postsDbType } from "../../models/postsTypes";
import { usersDbType } from "../../models/usersTypes";
import { CommentsDbType } from "../../models/comments-types";
import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";
import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { RequestsToApi } from "../../models/requests-to-api-types";

dotenv.config();
const dbName = "homeWork3";
// const mongoUri = `mongodb://0.0.0.0:27017/${dbName}`;
const mongoUri = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/${dbName}`;
if (!mongoUri) {
  throw new Error(`! Url doesn't found`);
}

// export const client = new MongoClient(mongoUri);
// const blogsDb = client.db("blogsDb");
// const postsDb = client.db("postsDb");
// const usersDb = client.db("users");
// const commentsDb = client.db("comments");
// const blackRefreshTokensDb = client.db("blackRefreshTokensDb");
// const securityDevicesDb = client.db("securityDevices");
// const requestsToApiDb = client.db("requestsToApiDb");
// export const postsCollection = postsDb.collection<postsDbType>("posts");
// export const blogsCollection = blogsDb.collection<blogsDbType>("blogs");
// export const usersCollection = usersDb.collection<usersDbType>("users");
// export const commentsCollection =
//   commentsDb.collection<CommentsDbType>("comments");
// export const blackRefreshTokensCollection =
//   blackRefreshTokensDb.collection<BlackRefreshTokensType>("blackRefreshTokens");
// export const securityDevicesCollection =
//   securityDevicesDb.collection<SecurityDevicesType>("securityDevices");
// export const requestsToApiCollection =
//   requestsToApiDb.collection<RequestsToApi>("requestsToApi");
export async function runDb() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected succesfully to mongo server");
  } catch (e) {
    console.log("Can't connect to mongo server");
    await mongoose.disconnect();
  }
}
