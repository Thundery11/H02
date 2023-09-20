import {Request, Response, Router } from "express";
import { blogsDb } from "../repositories/blogs.repository";
import { postsDb } from "../repositories/posts-repository";

export const testingAllDataRouter = Router({})

testingAllDataRouter.delete('/', (req : Request, res: Response)=>{
   blogsDb.length = 0
   postsDb.length = 0
res.send(204)
})