import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs-db-repository";

export const postsInputValidation = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: 30 })
      .bail()
      .withMessage("Invalid title"),

    body("shortDescription")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: 100 })
      .bail()
      .withMessage("Invalid title"),

    body("content")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: 1000 })
      .bail()
      .withMessage("Invalid title"),

    body("blogId")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .custom(async (blogId) => {
        const blogIsExist = await blogsRepository.findBlog(blogId);

        if (!blogIsExist) {
          throw new Error("Blog doesnt exist");
        }
        return true;
      })
      .withMessage("Invalid blogId"),
  ];
};
