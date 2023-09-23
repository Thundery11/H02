import { Router, Request, Response } from "express";
import { HTTP_STATUSES} from "../types/statuses";
import { blogsRepository } from "../repositories/blogs.repository";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";
import { blogsInputValidation } from "../middlewares/blogs-input-vadation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/',
 (req: Request, res: Response)=>{
    const allBlogs = blogsRepository.getAllBlogs()
    res.status(HTTP_STATUSES.OK_200).send(allBlogs)
})

blogsRouter.get('/:id', (req: RequestWithParams<{id: string}>, res: Response)=>{
    const blog = blogsRepository.findBlog(req.params.id)

        if(!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else{
        res.status(HTTP_STATUSES.OK_200).send(blog)
    }
})

blogsRouter.post('/',
authGuardMiddleware,
blogsInputValidation(),
errosValidation,
(req: RequestWithBody<{name: string,
    description: string, websiteUrl: string}>, res: Response)=>{

    const {name, description, websiteUrl} = req.body
    const createdBlog = blogsRepository.createBlog(name,description, websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)
})

blogsRouter.delete('/:id', 
authGuardMiddleware,
(req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id
    if(!id){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }else{
    blogsRepository.deleteBlog(id)
    res.send(HTTP_STATUSES.NO_CONTENT_204)
    }
})

blogsRouter.put('/:id',
authGuardMiddleware,
blogsInputValidation(),
errosValidation,
(req: RequestWithParamsAndBody<{id: string, name: string, description: string, websiteUrl: string}>, res: Response) => {
    const id = req.params.id
    const{name, description, websiteUrl} = req.body
    const changedBlog = blogsRepository.changeBlog(id, name, description, websiteUrl)
    if(!changedBlog){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else{
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
})