"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_input_validation_1 = require("../middlewares/posts-input-validation");
const erros_validation_1 = require("../middlewares/erros-validation");
const authorisationMiddleware_1 = require("../middlewares/authorisationMiddleware");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const comments_input_validation_1 = require("../middlewares/comments-input-validation");
const composition_root_1 = require("../composition-root");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", composition_root_1.postsController.findAllPosts.bind(composition_root_1.postsController));
exports.postsRouter.get("/:id", composition_root_1.postsController.findPost.bind(composition_root_1.postsController));
exports.postsRouter.post("/", authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, composition_root_1.postsController.createPost.bind(composition_root_1.postsController));
exports.postsRouter.post("/:postId/comments", auth_middleware_1.authMiddleware, (0, comments_input_validation_1.commentsInputValidation)(), erros_validation_1.errosValidation, composition_root_1.postsController.createComment.bind(composition_root_1.postsController));
exports.postsRouter.get("/:postId/comments", composition_root_1.postsController.findComments.bind(composition_root_1.postsController));
exports.postsRouter.delete("/:id", authorisationMiddleware_1.authGuardMiddleware, composition_root_1.postsController.deletePost.bind(composition_root_1.postsController));
exports.postsRouter.put("/:id", authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, composition_root_1.postsController.updatePost.bind(composition_root_1.postsController));
