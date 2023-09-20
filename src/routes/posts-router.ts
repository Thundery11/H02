import { Router, Request, Response } from "express"
import { HTTP_STATUSES} from "../types/statuses";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";
import { postsRepository } from "../repositories/posts-repository";
import { title } from "process";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(postsRepository.getAllPosts)    
})

postsRouter.get('/:id', (req: RequestWithParams<{id: string}>, res: Response) =>{
    const id = req.params.id
    const post = postsRepository.getPost(id)
    if(!post){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        res.status(HTTP_STATUSES.OK_200).send(post)
    }
})

postsRouter.post('/', (req:RequestWithBody<{
    title: string, shortDescription: string,
    content: string, blogId: string,
    blogName: string

}>, res: Response) => {
    let {title, shortDescription, content, blogId, blogName} = req.body
    const createdPost = postsRepository.createPost(title, shortDescription, content, blogId, blogName)
    res.send(createdPost)
})