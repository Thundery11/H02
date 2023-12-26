import { Router, Request, Response } from "express";
import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../models/requestsTypes";
import { CommentsOutputType } from "../models/comments-types";
import { CommentsService } from "../domain/comments-service/commentsService";
import { HTTP_STATUSES } from "../models/statuses";
import { CommentsRepository } from "../repositories/comments-repository/comments-repository";
import { LikesService } from "../domain/likes-service/likesService";
import { jwtService } from "../application/jwt-service";

export class CommentsController {
  constructor(
    protected commentsService: CommentsService,
    protected commentsRepository: CommentsRepository,
    protected likesServise: LikesService
  ) {}

  async findComments(req: RequestWithParams<{ id: string }>, res: Response) {
    const commentId = req.params.id;

    if (!req.headers.authorization) {
      const userId = null;
      const comment: CommentsOutputType | null =
        await this.commentsService.getComment(commentId, userId);
      if (!comment) {
        return res.send(HTTP_STATUSES.NOT_FOUND_404);
      }
      return res.status(HTTP_STATUSES.OK_200).send(comment);
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = await jwtService.getUserByToken(token);
    console.log(userId);

    const comment: CommentsOutputType | null =
      await this.commentsService.getComment(commentId, userId);
    if (!comment) {
      return res.send(HTTP_STATUSES.NOT_FOUND_404);
    }
    return res.status(HTTP_STATUSES.OK_200).send(comment);
  }

  async deleteComment(req: RequestWithParams<{ id: string }>, res: Response) {
    const userId = req.user?.id;
    const commentId = req.params.id;
    const comment = await this.commentsRepository.getComment(commentId);
    if (!comment) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    if (comment.commentatorInfo.userId !== userId) {
      return res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
    }
    const isDeletedComment = await this.commentsService.deleteComment(
      commentId
    );
    if (isDeletedComment) {
      return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }

  async updateComment(
    req: RequestWithParamsAndBody<{ id: string; content: string }>,
    res: Response
  ) {
    const commentId = req.params.id;
    const content = req.body.content;
    const userId = req.user?.id;
    const comment = await this.commentsRepository.getComment(commentId);
    if (!comment) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    if (comment.commentatorInfo.userId !== userId) {
      return res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
    }

    const changedComment = await this.commentsService.changeComment(
      commentId,
      content
    );
    if (!changedComment) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
  async updateLikeStatus(
    req: RequestWithParamsAndBody<{ commentId: string; likeStatus: string }>,
    res: Response
  ) {
    const commentId = req.params.commentId;
    const likeStatus = req.body.likeStatus;
    const userId = req.user?.id;
    const comment = await this.commentsRepository.getComment(commentId);
    if (!comment) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    if (!userId) return res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);

    const isLikeExist = await this.likesServise.isLikeExist(userId, commentId);
    if (!isLikeExist) {
      await this.likesServise.addLike(userId, commentId, likeStatus);
      return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
    const result = await this.likesServise.updateLike(
      userId,
      commentId,
      likeStatus
    );
    if (!result) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
}
