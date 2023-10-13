import express from "express";
import { testingAllDataRouter } from "./routes/testing-all-data";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";
import { usersRouter } from "./routes/users-router/users-router";
import { authRouter } from "./routes/auth-router/auth-router";

export const app = express();

app.use(express.json());
app.use("/testing/all-data", testingAllDataRouter);
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
