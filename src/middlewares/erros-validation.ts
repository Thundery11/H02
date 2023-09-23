
import { NextFunction , Request, Response} from "express";
import { validationResult , ValidationError, ErrorFormatter} from "express-validator";

const ErrorFormatter = (error: ValidationError) => {
    switch(error.type){

        case "field":
            return {
                message: error.msg,
                field: error.path
            } 
            default:
        return {
            message: error.msg,
            field: 'none'
            
        }
    } 
    }

export const errosValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const errorsMessages = errors.array().map(ErrorFormatter)
        res.send(errorsMessages)
        return
    } else{
        next()
    }
}



