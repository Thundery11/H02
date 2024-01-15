import { Router, Request, Response } from "express";
import { postsInputValidation } from "../middlewares/posts-input-validation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentsInputValidation } from "../middlewares/comments-input-validation";
import { container } from "../composition-root";
import { PostsController } from "../controllers/posts-controller";
import { likesInputValidation } from "../middlewares/likes-input-validation";

const postsController = container.resolve(PostsController);

export const postsRouter = Router({});

postsRouter.get("/", postsController.findAllPosts.bind(postsController));

postsRouter.get("/:id", postsController.findPost.bind(postsController));

postsRouter.post(
  "/",
  authGuardMiddleware,
  postsInputValidation(),
  errosValidation,
  postsController.createPost.bind(postsController)
);

postsRouter.post(
  "/:postId/comments",
  authMiddleware,
  commentsInputValidation(),
  errosValidation,
  postsController.createComment.bind(postsController)
);

postsRouter.get(
  "/:postId/comments",
  postsController.findComments.bind(postsController)
);

postsRouter.delete(
  "/:id",
  authGuardMiddleware,
  postsController.deletePost.bind(postsController)
);

postsRouter.put(
  "/:id",
  authGuardMiddleware,
  postsInputValidation(),
  errosValidation,
  postsController.updatePost.bind(postsController)
);

postsRouter.put(
  "/:postId/like-status",
  authMiddleware,
  likesInputValidation(),
  errosValidation,
  postsController.updateLikeStatus.bind(postsController)
);
