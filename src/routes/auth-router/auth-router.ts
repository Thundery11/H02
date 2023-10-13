import { Router , Request, Response } from "express";
import { RequestWithBody } from "../../types/requestsTypes";
import { usersService } from "../../domain/users-service/users-service";
import { HTTP_STATUSES } from "../../types/statuses";
import { authInputValidation } from "../../middlewares/auth-input-validation-middleware";
import { errosValidation } from "../../middlewares/erros-validation";


export const authRouter = Router({})

authRouter.post('/login', 
authInputValidation(),
errosValidation,
async (req: RequestWithBody<{loginOrEmail: string, password: string}>, res: Response) =>{
    const checkResult = await usersService.checkCredantials(req.body.loginOrEmail, req.body.password)
    if(!checkResult){
        res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401)
    } else{
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) 
    }
})