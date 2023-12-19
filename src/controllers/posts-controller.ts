import { Router, Request, Response } from "express";
import { HTTP_STATUSES } from "../models/statuses";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithQuery,
  RequestWithParamsAndQuery,
} from "../models/requestsTypes";
import { PostsService } from "../domain/posts-service/posts-service";
import { PostsQueryParams, postsDbType } from "../models/postsTypes";
import { BlogsRepository } from "../repositories/blogs-db-repository";
import { CommentsDbType, CommentsQueryParams } from "../models/comments-types";

export const postsRouter = Router({});

export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected blogsRepository: BlogsRepository
  ) {}

  async findAllPosts(req: RequestWithQuery<PostsQueryParams>, res: Response) {
    const {
      searchNameTerm = "",
      sortBy = "createdAt",
      sortDirection = "desc",
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const query = {};
    const skip = (pageNumber - 1) * pageSize;

    const allPosts: postsDbType[] = await this.postsService.getAllPosts(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    const countedDocuments = await this.postsService.countDocuments(query);

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

  async findPost(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    const post = await this.postsService.getPost(id);

    if (!post) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.status(HTTP_STATUSES.OK_200).send(post);
    }
  }

  async createPost(
    req: RequestWithBody<{
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }>,
    res: Response
  ) {
    const { title, shortDescription, content, blogId } = req.body;

    const blog = await this.blogsRepository.findBlog(blogId);
    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      const createdPost = await this.postsService.createPost(
        title,
        shortDescription,
        content,
        blogId,
        blog.name
      );
      res.status(HTTP_STATUSES.CREATED_201).send(createdPost);
    }
  }

  async createComment(
    req: RequestWithParamsAndBody<{ postId: string; content: string }>,
    res: Response
  ) {
    const postId = req.params.postId;
    const isExistPost = await this.postsService.getPost(postId);
    if (!isExistPost) {
      res.status(HTTP_STATUSES.NOT_FOUND_404).send();
      return;
    } else {
      const userId = req.user?.id;
      const userLogin = req.user?.accountData.login;
      const content = req.body.content;
      const createdComment = await this.postsService.createCommet(
        postId,
        content,
        userId!,
        userLogin!
      );
      res.status(HTTP_STATUSES.CREATED_201).send(createdComment);
    }
  }

  async findComment(
    req: RequestWithParamsAndQuery<CommentsQueryParams>,
    res: Response
  ) {
    const postId = req.params.postId;
    const isExistPost = await this.postsService.getPost(postId);
    if (!isExistPost) {
      res.status(HTTP_STATUSES.NOT_FOUND_404).send();
      return;
    }
    const {
      sortBy = "createdAt",
      sortDirection = "desc",
      pageSize = 10,
      pageNumber = 1,
    } = req.query;
    const skip = (pageNumber - 1) * pageSize;
    const recivedComments: CommentsDbType[] =
      await this.postsService.getComments(
        sortBy,
        sortDirection,
        pageSize,
        skip,
        postId
      );
    const countedComments = await this.postsService.countAllComments(postId);

    const pagesCount = Math.ceil(countedComments / pageSize);
    const presentationComments = {
      pagesCount,
      page: Number(pageNumber),
      pageSize: Number(pageSize),
      totalCount: countedComments,
      items: recivedComments,
    };
    return res.status(HTTP_STATUSES.OK_200).send(presentationComments);
  }

  async deletePost(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    const isDeletedPost = await this.postsService.deletePost(id);
    if (!isDeletedPost) {
      res.status(HTTP_STATUSES.NOT_FOUND_404).send();
      return;
    } else {
      res.status(HTTP_STATUSES.NO_CONTENT_204).send();
    }
  }

  async updatePost(
    req: RequestWithParamsAndBody<{
      id: string;
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }>,
    res: Response
  ) {
    const id = req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    const changedPost = await this.postsService.updatePost(
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
}
