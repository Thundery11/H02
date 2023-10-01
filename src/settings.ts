import express from "express"; 
// import { testingAllDataRouter } from "./routes/testing-all-data";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";

export const app = express();

app.use(express.json())
// app.use('/testing/all-data', testingAllDataRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)