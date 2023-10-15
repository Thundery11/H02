import { Router, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import { blogsService } from "../domain/blogs-service/blogs-service";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithQuery,
  RequestWithParamsAndQuery,
} from "../models/requestsTypes";
import { blogsInputValidation } from "../middlewares/blogs-input-vadation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import {
  BlogQueryParams,
  PostsForBlogsQueryParams,
  blogsDbType,
} from "../models/blogsTypes";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { blogsRepository } from "../repositories/blogs-db-repository";
import { postsDbType } from "../models/postsTypes";
import { postsForBlogsInputValidation } from "../middlewares/posts-for-blogs-validation";

export const blogsRouter = Router({});

blogsRouter.get(
  "/",
  async (req: RequestWithQuery<BlogQueryParams>, res: Response) => {
    const {
      searchNameTerm = "",
      sortBy = "createdAt",
      sortDirection = "desc",
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const query = { name: new RegExp(searchNameTerm, "i") };
    const skip = (pageNumber - 1) * pageSize;

    const allBlogs: blogsDbType[] = await blogsService.getAllBlogs(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    const countedDocuments = await blogsService.countDocuments(query);
    // const totalCount: number = allBlogs.length;
    const pagesCount: number = Math.ceil(countedDocuments / pageSize);
    const presentationAllblogs = {
      pagesCount,
      page: Number(pageNumber),
      pageSize: Number(pageSize),
      totalCount: countedDocuments,
      items: allBlogs,
    };
    res.status(HTTP_STATUSES.OK_200).send(presentationAllblogs);
  }
);

blogsRouter.get(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const blog = await blogsService.findBlog(req.params.id);

    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.status(HTTP_STATUSES.OK_200).send(blog);
    }
  }
);
blogsRouter.get(
  "/:blogId/posts",
  async (
    req: RequestWithParamsAndQuery<PostsForBlogsQueryParams>,
    res: Response
  ) => {
    const {
      sortBy = "createdAt",
      sortDirection = "desc",
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const blogId = req.params.blogId;

    const skip = (pageNumber - 1) * pageSize;
    const sorting = sortDirection === "ask" ? 1 : -1;
    const blog: blogsDbType | null = await blogsService.findBlog(blogId);
    if (!blog) {
      res.sendStatus(404);
      return;
    } else {
      const allPostsForBlog: postsDbType[] =
        await blogsService.getAllPostsForBlogs(
          blogId,
          sortBy,
          sortDirection,
          pageSize,
          skip
        );
      const countedDocuments = await blogsService.countAllDocuments();

      const pagesCount: number = Math.ceil(countedDocuments / pageSize);
      const presentationPostsForBlogs = {
        pagesCount,
        page: Number(pageNumber),
        pageSize: Number(pageSize),
        totalCount: countedDocuments,
        items: allPostsForBlog,
      };

      res.status(HTTP_STATUSES.OK_200).send(presentationPostsForBlogs);
    }
  }
);

blogsRouter.post(
  "/",
  authGuardMiddleware,
  blogsInputValidation(),
  errosValidation,
  async (
    req: RequestWithBody<{
      name: string;
      description: string;
      websiteUrl: string;
    }>,
    res: Response
  ) => {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = await blogsService.createBlog(
      name,
      description,
      websiteUrl
    );
    res.status(HTTP_STATUSES.CREATED_201).send(createdBlog);
  }
);

blogsRouter.post(
  "/:blogId/posts",
  authGuardMiddleware,
  postsForBlogsInputValidation(),
  errosValidation,
  async (
    req: RequestWithParamsAndBody<{
      blogId: string;
      title: string;
      shortDescription: string;
      content: string;
    }>,
    res: Response
  ) => {
    const blogId = req.params.blogId;
    const blog = await blogsService.findBlog(blogId);
    if (!blog) {
      res.sendStatus(404);
      return;
    } else {
      const { title, shortDescription, content } = req.body;
      const blogName = blog.name;
      const createdPostForBlogs = await blogsService.createPostForBlog(
        blogId,
        title,
        shortDescription,
        content,
        blogName
      );

      res.status(HTTP_STATUSES.CREATED_201).send(createdPostForBlogs);
    }
  }
);

blogsRouter.delete(
  "/:id",
  authGuardMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const isDeletedBlog = await blogsService.deleteBlog(id);
    if (!isDeletedBlog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.send(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);

blogsRouter.put(
  "/:id",
  authGuardMiddleware,
  blogsInputValidation(),
  errosValidation,
  async (
    req: RequestWithParamsAndBody<{
      id: string;
      name: string;
      description: string;
      websiteUrl: string;
    }>,
    res: Response
  ) => {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    const changedBlog = await blogsService.changeBlog(
      id,
      name,
      description,
      websiteUrl
    );
    if (!changedBlog) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
