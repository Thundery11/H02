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
import { PostsQueryParams, PostsType, postsDbType } from "../models/postsTypes";
import { BlogsRepository } from "../repositories/blogs-db-repository";
import { CommentsQueryParams, CommentsType } from "../models/comments-types";
import { CommentsService } from "../domain/comments-service/commentsService";
import { jwtService } from "../application/jwt-service";
import { inject, injectable } from "inversify";
import { MyStatus } from "../models/likesTypes";
import { LikesService } from "../domain/likes-service/likesService";
@injectable()
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected blogsRepository: BlogsRepository,
    protected commentsService: CommentsService,
    protected likesService: LikesService
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

    if (!req.headers.authorization) {
      const userId = null;
      const post: PostsType | null = await this.postsService.getPost(
        id,
        userId
      );

      if (!post) {
        res.send(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.status(HTTP_STATUSES.OK_200).send(post);
      }
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const userId = await jwtService.getUserByToken(token);

      const post: PostsType | null = await this.postsService.getPost(
        id,
        userId
      );

      if (!post) {
        res.send(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.status(HTTP_STATUSES.OK_200).send(post);
      }
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
    console.log(blog);
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
    const userId = req.user?.id;
    const postId = req.params.postId;
    const isExistPost = await this.postsService.getPost(postId);
    if (!isExistPost) {
      res.status(HTTP_STATUSES.NOT_FOUND_404).send();
      return;
    } else {
      const userId = req.user?.id;
      const userLogin = req.user?.accountData.login;
      const content = req.body.content;
      const createdComment = await this.postsService.createComment(
        postId,
        content,
        userId!,
        userLogin!
      );
      res.status(HTTP_STATUSES.CREATED_201).send(createdComment);
    }
  }

  async findComments(
    req: RequestWithParamsAndQuery<CommentsQueryParams>,
    res: Response
  ) {
    const postId = req.params.postId;
    const isExistPost = await this.postsService.getPost(postId);
    if (!isExistPost) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    const {
      sortBy = "createdAt",
      sortDirection = "desc",
      pageSize = 10,
      pageNumber = 1,
    } = req.query;
    const skip = (pageNumber - 1) * pageSize;

    if (!req.headers.authorization) {
      const userId = null;
      const recivedComments: CommentsType[] =
        await this.postsService.getComments(
          sortBy,
          sortDirection,
          pageSize,
          skip,
          postId,
          userId
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
    const token = req.headers.authorization.split(" ")[1];
    const userId = await jwtService.getUserByToken(token);
    const recivedComments: CommentsType[] = await this.postsService.getComments(
      sortBy,
      sortDirection,
      pageSize,
      skip,
      postId,
      userId
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
  async updateLikeStatus(
    req: RequestWithParamsAndBody<{ postId: string; likeStatus: MyStatus }>,
    res: Response
  ) {
    const postId = req.params.postId;
    const likeStatus = req.body.likeStatus;
    const userId = req.user?.id;
    const userLogin = req.user?.accountData.login;
    if (!userId) {
      return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
    }
    const post = await this.postsService.getPost(postId, userId);
    console.log(post);

    if (!post) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    if (!userLogin) {
      console.log("userID not found");
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    const isLikeExist = await this.likesService.isLikeExist(userId, postId);
    if (!isLikeExist) {
      await this.likesService.addLike(userId, postId, likeStatus);
      console.log(`everything ok , like added ${isLikeExist}`);
      if (likeStatus === MyStatus.Like) {
        await this.likesService.lastLiked(userId, userLogin, postId);
      }
      return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
    const result = await this.likesService.updateLike(
      userId,
      postId,
      likeStatus
    );
    if (likeStatus === MyStatus.Dislike || likeStatus === MyStatus.None) {
      await this.likesService.deleteLastLiked(userId, postId);
    }

    if (!result) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    console.log(result);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
}
