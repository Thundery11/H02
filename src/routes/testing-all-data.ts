import {Request, Response, Router } from "express";
import { blogsCollection, postsCollection } from "../repositories/dataBase/blogsDb";


export const testingAllDataRouter = Router({})

testingAllDataRouter.delete('/', async (req : Request, res: Response)=>{
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
res.send(204)
})