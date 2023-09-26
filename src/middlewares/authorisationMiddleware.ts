import { NextFunction, Request, Response } from "express"
import { HTTP_STATUSES } from "../types/statuses"
import { atob } from "buffer"

const expectedAuthHeader = 'admin:qwerty'
export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Basic ')){
        res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401)
        return
    }

    const splitHeader = authHeader.split(' ')[1]
    const type = authHeader.split(' ')[0]
    let encodeHeader
    try{
        encodeHeader = atob(splitHeader)
    } catch(e){
        console.log('authGuardMiddleware:', e)
        return res.send(HTTP_STATUSES.UNAUTHORISED_401)
    }

    if(type !== 'Basic' || encodeHeader !== "admin:qwerty"){
        return  res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401)
        
    }
    
    return next()

}