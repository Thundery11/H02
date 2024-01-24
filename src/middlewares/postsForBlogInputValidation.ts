import { body, param } from "express-validator";
import { blogsController } from "../routes/blogs-router";
import { container } from "../composition-root";
import { BlogsRepository } from "../repositories/blogs-db-repository";

export const postsForBlogInputValidation = () => {
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

    param("blogId")
      .trim()
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .custom(async (blogId) => {
        const blogsRepository = container.resolve(BlogsRepository);
        const blog = await blogsRepository.findBlog.bind(blogsRepository)(
          blogId
        );
        // const blogIsExist = blogsController.findBlog.bind(blogsController)(blogId);
        console.log(`blog: ${blog}`);
        if (!blog) {
          throw new Error("Blog doesnt exist");
        }
        return true;
      })
      .withMessage("Invalid blogId"),
  ];
};
