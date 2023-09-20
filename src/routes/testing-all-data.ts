import {Request, Response, Router } from "express";
import { blogsDb } from "../repositories/blogs.repository";

export const testingAllDataRouter = Router({})

testingAllDataRouter.delete('/', (req : Request, res: Response)=>{
   blogsDb.length = 0;
res.send(204)
})