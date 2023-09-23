import { Router, Request, Response } from "express"
import { HTTP_STATUSES} from "../types/statuses";
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from "../types/requestsTypes";
import { postsRepository } from "../repositories/posts-repository";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(postsRepository.getAllPosts())    
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

postsRouter.post('/', 
authGuardMiddleware,
postsInputValidation(),
errosValidation,
(req:RequestWithBody<{
    title: string, shortDescription: string,
    content: string, blogId: string,
}>, res: Response) => {

    let {title, shortDescription, content, blogId} = req.body
    const createdPost = postsRepository.createPost(title, shortDescription, content, blogId)
    res.send(createdPost)
})

postsRouter.delete('/:id',
authGuardMiddleware,
(req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id
    postsRepository.deletePost(id)
    res.send(HTTP_STATUSES.NO_CONTENT_204)
})

postsRouter.put('/:id', 
authGuardMiddleware,
postsInputValidation(),
errosValidation,
(req: RequestWithParamsAndBody<{id: string,
    title: string, shortDescription: string,
    content: string, blogId: string}>, res: Response) => {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body
        const changedPost =  postsRepository.updatePost(id, title, shortDescription, content, blogId)
        if(!changedPost){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }else{
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })