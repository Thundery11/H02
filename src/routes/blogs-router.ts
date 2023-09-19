import { Router, Request, Response } from "express";
import { HTTP_STATUSES, RequestWithParams } from "../types";
import { blogsDb } from "../db/blogs-db";

export const blogsRouter = Router({})
blogsRouter.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUSES.OK_200).send(blogsDb)
})

blogsRouter.get('/:id', (req: RequestWithParams<{id: string}>, res: Response)=>{
    const id = req.params.id.toString()
    const blog = blogsDb.find(b => b.id === id)
    if(!blog){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(blog)
    } else{
        res.sendStatus(HTTP_STATUSES.OK_200).send(blog)
    }
})