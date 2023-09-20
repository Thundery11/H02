import { Router, Request, Response } from "express";
import { HTTP_STATUSES} from "../types/statuses";
import { blogsDb, blogsRepository } from "../repositories/blogs.repository";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";

export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUSES.OK_200).send(blogsRepository.getAllBlogs)
})

blogsRouter.get('/:id', (req: RequestWithParams<{id: string}>, res: Response)=>{
    const blog = blogsRepository.findBlog(req.params.id)
        if(!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else{
        res.status(HTTP_STATUSES.OK_200).send(blog)
    }
})