import mongoose from "mongoose";
import dotenv from "dotenv";
import { BlogType } from "../../models/blogsTypes";
import { postsDbType } from "../../models/postsTypes";
import { usersDbType } from "../../models/usersTypes";
import { CommentsDbType } from "../../models/comments-types";
import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { RequestsToApiType } from "../../models/requests-to-api-types";
import { BlogSchema } from "../../mongo/blog/blog-schema";
import { PostSchema } from "../../mongo/post/post-schema";
import { UsersSchema } from "../../mongo/users/users-schema";
import { CommentsSchema } from "../../mongo/comments/comments-schema";
import { SecurityDevicesSchema } from "../../mongo/security-devices/securityDevices-schema";
import { RequestsToApiSchema } from "../../mongo/requests-to-api/requests-to-api-schema";
import { BlackRefreshTokensType } from "../../models/blackRefreshTokensTypes";
import { blackRefreshTokenSchema } from "../../mongo/blackRefreshTokenSchema/blackRefreshTokenSchema";

dotenv.config();
const dbName = "homeWork10";
// const mongoUri = `mongodb://0.0.0.0:27017/${dbName}`;
const mongoUri = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/${dbName}`;
if (!mongoUri) {
  throw new Error(`! Url doesn't found`);
}
export const BlogModel = mongoose.model<BlogType>("blogs", BlogSchema);
export const PostModel = mongoose.model<postsDbType>("posts", PostSchema);
export const UserModel = mongoose.model<usersDbType>("users", UsersSchema);
export const CommentsModel = mongoose.model<CommentsDbType>(
  "comments",
  CommentsSchema
);
export const SecurityDevicesModel = mongoose.model<SecurityDevicesType>(
  "securityDevices",
  SecurityDevicesSchema
);
export const RequestsToApiModel = mongoose.model<RequestsToApiType>(
  "requestsToApi",
  RequestsToApiSchema
);
export const BlackRefreshTokenModel = mongoose.model<BlackRefreshTokensType>(
  "blackRefreshTokens",
  blackRefreshTokenSchema
);

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
