import { Router, Request, Response } from "express";
import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../models/requestsTypes";
import { CommentsOutputType } from "../models/comments-types";
import { CommentsService } from "../domain/comments-service/commentsService";
import { HTTP_STATUSES } from "../models/statuses";
import { CommentsRepository } from "../repositories/comments-repository/comments-repository";

export class CommentsController {
  constructor(
    protected commentsService: CommentsService,
    protected commentsRepository: CommentsRepository
  ) {}

  async findComments(req: RequestWithParams<{ id: string }>, res: Response) {
    const commentId = req.params.id;

    const comment: CommentsOutputType | null =
      await this.commentsService.getComment(commentId);
    if (!comment) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    return res.status(HTTP_STATUSES.OK_200).send(comment);
  }

  async deleteComment(req: RequestWithParams<{ id: string }>, res: Response) {
    const userId = req.user?.id;
    const commentId = req.params.id;
    const comment = await this.commentsRepository.getComment(commentId);
    if (!comment) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    if (comment.commentatorInfo.userId !== userId) {
      res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
      return;
    }
    const isDeletedComment = await this.commentsService.deleteComment(
      commentId
    );
    if (isDeletedComment) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
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
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    if (comment.commentatorInfo.userId !== userId) {
      res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
      return;
    }

    const changedComment = await this.commentsService.changeComment(
      commentId,
      content
    );
    if (!changedComment) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
}
