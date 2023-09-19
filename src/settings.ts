import express , {Request, Response} from "express"; 
import { testingAllDataRouter } from "./routes/testing-all-data";

export const app = express();
app.use(express.json())
app.use('/testing/all-data', testingAllDataRouter)