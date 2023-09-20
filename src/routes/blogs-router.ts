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

blogsRouter.post('/', (req: RequestWithBody<{name: string, description: string, websiteUrl: string}>, res: Response)=>{
    let {name, description, websiteUrl} = req.body
    const createdBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)
})