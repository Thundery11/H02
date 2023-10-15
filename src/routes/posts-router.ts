import { Router, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../models/requestsTypes";
import { postsService } from "../domain/posts-service/posts-service";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import { PostsQueryParams, postsDbType } from "../models/postsTypes";

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

    const query = { name: new RegExp(searchNameTerm, "i") };
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
    const createdPost = await postsService.createPost(
      title,
      shortDescription,
      content,
      blogId
    );
    res.status(HTTP_STATUSES.CREATED_201).send(createdPost);
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
