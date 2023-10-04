import { Router, Request, Response } from "express";
import { HTTP_STATUSES} from "../types/statuses";
import { blogsService } from "../domain/blogs-service/blogs-service";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";
import { blogsInputValidation } from "../middlewares/blogs-input-vadation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import { blogsDbType } from "../types/blogsTypes";

export const blogsRouter = Router({})

blogsRouter.get('/', 
async (req: Request, res: Response)=>{
    const allBlogs: blogsDbType[] = await blogsService.getAllBlogs()

    res.status(HTTP_STATUSES.OK_200).send(allBlogs)
})

blogsRouter.get('/:id', async (req: RequestWithParams<{id: string}>, res: Response)=>{
    const blog = await blogsService.findBlog(req.params.id)

        if(!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else{
        res.status(HTTP_STATUSES.OK_200).send(blog)
    }
})

blogsRouter.post('/',
authGuardMiddleware,
blogsInputValidation(),
errosValidation,
async (req: RequestWithBody<{name: string,
    description: string, websiteUrl: string}>, res: Response)=>{

    const {name, description, websiteUrl} = req.body
    const createdBlog = await blogsService.createBlog(name,description, websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)
})

blogsRouter.delete('/:id', 
authGuardMiddleware,
async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id
    const isDeletedBlog = await blogsService.deleteBlog(id)
        if(!isDeletedBlog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }else {
    res.send(HTTP_STATUSES.NO_CONTENT_204)
    }
})

blogsRouter.put('/:id',
authGuardMiddleware,
blogsInputValidation(),
errosValidation,
async (req: RequestWithParamsAndBody<{id: string, name: string, description: string, websiteUrl: string}>, res: Response) => {
    const id = req.params.id
    const{name, description, websiteUrl} = req.body
    const changedBlog = await blogsService.changeBlog(id, name, description, websiteUrl)
    if(!changedBlog){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else{
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
})
