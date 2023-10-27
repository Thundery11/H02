import { Router, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithQuery,
  RequestWithParamsAndQuery,
} from "../models/requestsTypes";
import { postsService } from "../domain/posts-service/posts-service";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import { PostsQueryParams, postsDbType } from "../models/postsTypes";
import { blogsRepository } from "../repositories/blogs-db-repository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentsInputValidation } from "../middlewares/comments-input-validation";
import { CommentsDbType, CommentsQueryParams } from "../models/comments-types";

export const postsRouter = Router({});

postsRouter.get(
  "/",
  async (req: RequestWithQuery<PostsQueryParams>, res: Response) => {
    const {
      searchNameTerm = "",
      sortBy = "createdAt",
      sortDirection = "desc",
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const query = {};
    const skip = (pageNumber - 1) * pageSize;

    const allPosts: postsDbType[] = await postsService.getAllPosts(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    console.log(allPosts);
    const countedDocuments = await postsService.countDocuments(query);

    const pagesCount: number = Math.ceil(countedDocuments / pageSize);
    const presentationAllposts = {
      pagesCount,
      page: Number(pageNumber),
      pageSize: Number(pageSize),
      totalCount: countedDocuments,
      items: allPosts,
    };
    res.status(HTTP_STATUSES.OK_200).send(presentationAllposts);
  }
);

postsRouter.get(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const post = await postsService.getPost(id);

    if (!post) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.status(HTTP_STATUSES.OK_200).send(post);
    }
  }
);

postsRouter.post(
  "/",
  authGuardMiddleware,
  postsInputValidation(),
  errosValidation,
  async (
    req: RequestWithBody<{
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }>,
    res: Response
  ) => {
    const { title, shortDescription, content, blogId } = req.body;

    const blog = await blogsRepository.findBlog(blogId);
    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      const createdPost = await postsService.createPost(
        title,
        shortDescription,
        content,
        blogId,
        blog.name
      );
      res.status(HTTP_STATUSES.CREATED_201).send(createdPost);
    }
  }
);
postsRouter.post(
  "/:postId/comments",
  authMiddleware,
  commentsInputValidation(),
  errosValidation,
  async (
    req: RequestWithParamsAndBody<{ postId: string; content: string }>,
    res: Response
  ) => {
    const postId = req.params.postId;
    const isExistPost = await postsService.getPost(postId);
    if (!isExistPost) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      const userId = req.user?.id;
      const userLogin = req.user?.login;
      const content = req.body.content;
      const createdComment = await postsService.createCommet(
        postId,
        content,
        userId!,
        userLogin!
      );
      res.status(HTTP_STATUSES.CREATED_201).send(createdComment);
    }
  }
);

postsRouter.get(
  "/:postId/comments",
  async (
    req: RequestWithParamsAndQuery<CommentsQueryParams>,
    res: Response
  ) => {
    const postId = req.params.postId;
    const isExistPost = await postsService.getPost(postId);
    if (!isExistPost) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      const {
        sortBy = "createdAt",
        sortDirection = "desc",
        pageSize = 10,
        pageNumber = 1,
      } = req.query;
      const skip = (pageNumber - 1) * pageSize;
      const recivedComments: CommentsDbType[] = await postsService.getComments(
        sortBy,
        sortDirection,
        pageSize,
        skip,
        postId
      );
      const countedComments = await postsService.countAllComments(postId);

      const pagesCount = Math.ceil(countedComments / pageSize);
      const presentationComments = {
        pagesCount,
        page: Number(pageNumber),
        pageSize: Number(pageSize),
        totalCount: countedComments,
        items: recivedComments,
      };
      res.status(HTTP_STATUSES.OK_200).send(presentationComments);
    }
  }
);

postsRouter.delete(
  "/:id",
  authGuardMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const isDeletedPost = await postsService.deletePost(id);
    if (!isDeletedPost) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.send(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);

postsRouter.put(
  "/:id",
  authGuardMiddleware,
  postsInputValidation(),
  errosValidation,
  async (
    req: RequestWithParamsAndBody<{
      id: string;
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }>,
    res: Response
  ) => {
    const id = req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    const changedPost = await postsService.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
    if (!changedPost) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
