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
    const commentId = req.params.id;
    const isDeletedComment = await commentsService.deleteComment(commentId);
    if (isDeletedComment) {
      res.send(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
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
    const changedComment = await commentsService.changeComment(
      commentId,
      content
    );
    if (!changedComment) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.send(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
