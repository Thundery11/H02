import {Request, Response, Router } from "express";
import { postsDb } from "../db/posts-db";
export const testingAllDataRouter = Router({})

testingAllDataRouter.delete('/', (req, res)=>{
    db.length = 0;
res.send(204)
})