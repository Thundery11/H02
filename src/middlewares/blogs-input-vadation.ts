import { body } from "express-validator";
export const blogsInputValidation = () =>{
    return [
        body('name')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .isLength({min: 1, max: 15})
        .bail()
        .withMessage('Invalid name'),

        body('description')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({min: 1, max: 500})
        .bail()
        .withMessage('Inavalid description'),

        body('websiteUrl')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({min: 1, max: 40})
        .bail()
        .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
        .bail()
        .withMessage('Invalid website URL')
    ]


}