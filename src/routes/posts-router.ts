import { Router, Request, Response } from "express"
import { HTTP_STATUSES} from "../types/statuses";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";
import { postsRepository } from "../repositories/posts-db-repository";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import { postsDbType } from "../types/postsTypes";


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const getAllPosts : postsDbType[] = await postsRepository.getAllPosts()
    res.status(HTTP_STATUSES.OK_200).send(getAllPosts)    
})

postsRouter.get('/:id', async (req: RequestWithParams<{id: string}>, res: Response) =>{
    const id = req.params.id
    const post = await postsRepository.getPost(id)

    if(!post){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else {
        res.status(HTTP_STATUSES.OK_200).send(post)
    }
})

postsRouter.post('/', 
authGuardMiddleware,
postsInputValidation(),
errosValidation,
async (req:RequestWithBody<{
    title: string, shortDescription: string,
    content: string, blogId: string,
}>, res: Response) => {

    const {title, shortDescription, content, blogId} = req.body
    const createdPost = await postsRepository.createPost(title, shortDescription, content, blogId)
    res.status(HTTP_STATUSES.CREATED_201).send(createdPost)
})

postsRouter.delete('/:id',
authGuardMiddleware,
async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id
    const isDeletedPost = await postsRepository.deletePost(id)
    if(!isDeletedPost){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else{
    res.send(HTTP_STATUSES.NO_CONTENT_204)
    }
})

postsRouter.put('/:id', 
authGuardMiddleware,
postsInputValidation(),
errosValidation,
async (req: RequestWithParamsAndBody<{id: string,
    title: string, shortDescription: string,
    content: string, blogId: string}>, res: Response) => {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body
        const changedPost = await postsRepository.updatePost(id, title, shortDescription, content, blogId)
        if(!changedPost){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }else{
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })