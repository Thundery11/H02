import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { commentsInputValidation } from "../../middlewares/comments-input-validation";
import { errosValidation } from "../../middlewares/erros-validation";
import { commentsController } from "../../composition-root";
import { likesInputValidation } from "../../middlewares/likes-input-validation";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  commentsController.findComments.bind(commentsController)
);

commentsRouter.delete(
  "/:id",
  authMiddleware,
  commentsController.deleteComment.bind(commentsController)
);

commentsRouter.put(
  "/:id",
  authMiddleware,
  commentsInputValidation(),
  errosValidation,
  commentsController.updateComment.bind(commentsController)
);

commentsRouter.put(
  "/:commentId/like-status",
  authMiddleware,
  likesInputValidation(),
  errosValidation,
  commentsController.updateLikeStatus.bind(commentsController)
);
