import { Router, Request, Response } from "express";
import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../../models/requestsTypes";
import { CommentsOutputType } from "../../models/comments-types";
import { commentsService } from "../../domain/comments-service/commentsService";
import { HTTP_STATUSES } from "../../models/statuses";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { commentsInputValidation } from "../../middlewares/comments-input-validation";
import { errosValidation } from "../../middlewares/erros-validation";
import { commentsRepository } from "../../repositories/comments-repository/comments-repository";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const commentId = req.params.id;

    const comment: CommentsOutputType | null = await commentsService.getComment(
      commentId
    );
    if (!comment) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.status(HTTP_STATUSES.OK_200).send(comment);
    }
  }
);

commentsRouter.delete(
  "/:id",
  authMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const userId = req.user?.id;
    const commentId = req.params.id;
    const comment = await commentsRepository.getComment(commentId);
    if (!comment) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    if (comment.commentatorInfo.userId !== userId) {
      res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
      return;
    }
    const isDeletedComment = await commentsService.deleteComment(commentId);
    if (isDeletedComment) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
);

commentsRouter.put(
  "/:id",
  authMiddleware,
  commentsInputValidation(),
  errosValidation,
  async (
    req: RequestWithParamsAndBody<{ id: string; content: string }>,
    res: Response
  ) => {
    const commentId = req.params.id;
    const content = req.body.content;
    const userId = req.user?.id;
    const comment = await commentsRepository.getComment(commentId);
    if (!comment) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    if (comment.commentatorInfo.userId !== userId) {
      res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
      return;
    }

    const changedComment = await commentsService.changeComment(
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
);
