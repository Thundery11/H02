import {Request, Response, Router } from "express";
import { postsDb } from "../db/posts-db";
export const testingAllDataRouter = Router({})

testingAllDataRouter.delete('/', (req : Request, res: Response)=>{
    postsDb.length = 0;
res.send(204)
})