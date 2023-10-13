import { body } from "express-validator"

export const usersInputValidation = () =>{
    return [
        body('login')
        .isString()
        .bail()
        .isLength({min: 3, max: 10})
        .bail()
        .matches(/^[a-zA-Z0-9_-]*$/)
        .bail()
        .withMessage('invalid login'),

        body('password')
        .isString()
        .bail()
        .isLength({min: 6, max: 20})
        .bail()
        .withMessage('incorrect password'),

        body('email')
        .isString()
        .bail()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .bail()
        .withMessage('ivalid email')


    ]
}