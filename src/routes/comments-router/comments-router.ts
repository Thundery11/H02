import { Router, Request, Response } from "express";
import { RequestWithParams } from "../../models/requestsTypes";
import { CommentsOutputType } from "../../models/comments-types";
import { commentsService } from "../../domain/comments-service/commentsService";
import { HTTP_STATUSES } from "../../models/statuses";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const commentId = req.params.id;

    const comment: CommentsOutputType | null = await commentsService.getComment(
      commentId
    );
    console.log(comment);
    if (!comment) {
      res.send(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.status(HTTP_STATUSES.OK_200).send(comment);
    }
  }
);
