import express from "express";
import { testingAllDataRouter } from "./routes/testing-all-data";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";
import { usersRouter } from "./routes/users-router/users-router";
import { authRouter } from "./routes/auth-router/auth-router";
import { commentsRouter } from "./routes/comments-router/comments-router";

export const app = express();
export const settings = {
  JWT_SECRET: process.env.JWT_SECRET || "123",
};

app.use(express.json());
app.use("/testing/all-data", testingAllDataRouter);
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);
