import express , {Request, Response} from "express"; 
import { testingAllDataRouter } from "./routes/testing-all-data";
import { blogsRouter } from "./routes/blogs-router";

export const app = express();
app.use(express.json())
app.use('/testing/all-data', testingAllDataRouter)
app.use('/blogs', blogsRouter)