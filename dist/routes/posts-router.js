"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../models/statuses");
const posts_service_1 = require("../domain/posts-service/posts-service");
const posts_input_validation_1 = require("../middlewares/posts-input-validation");
const erros_validation_1 = require("../middlewares/erros-validation");
const authorisationMiddleware_1 = require("../middlewares/authorisationMiddleware");
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const comments_input_validation_1 = require("../middlewares/comments-input-validation");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchNameTerm = "", sortBy = "createdAt", sortDirection = "desc", pageNumber = 1, pageSize = 10, } = req.query;
    const query = {};
    const skip = (pageNumber - 1) * pageSize;
    const allPosts = yield posts_service_1.postsService.getAllPosts(query, sortBy, sortDirection, pageSize, skip);
    const countedDocuments = yield posts_service_1.postsService.countDocuments(query);
    const pagesCount = Math.ceil(countedDocuments / pageSize);
    const presentationAllposts = {
        pagesCount,
        page: Number(pageNumber),
        pageSize: Number(pageSize),
        totalCount: countedDocuments,
        items: allPosts,
    };
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(presentationAllposts);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield posts_service_1.postsService.getPost(id);
    if (!post) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.OK_200).send(post);
    }
}));
exports.postsRouter.post("/", authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = yield blogs_db_repository_1.blogsRepository.findBlog(blogId);
    if (!blog) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    else {
        const createdPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, blogId, blog.name);
        res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdPost);
    }
}));
exports.postsRouter.post("/:postId/comments", auth_middleware_1.authMiddleware, (0, comments_input_validation_1.commentsInputValidation)(), erros_validation_1.errosValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const postId = req.params.postId;
    const isExistPost = yield posts_service_1.postsService.getPost(postId);
    if (!isExistPost) {
        res.status(statuses_1.HTTP_STATUSES.NOT_FOUND_404).send();
        return;
    }
    else {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userLogin = (_b = req.user) === null || _b === void 0 ? void 0 : _b.accountData.login;
        const content = req.body.content;
        const createdComment = yield posts_service_1.postsService.createCommet(postId, content, userId, userLogin);
        res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdComment);
    }
}));
exports.postsRouter.get("/:postId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const isExistPost = yield posts_service_1.postsService.getPost(postId);
    if (!isExistPost) {
        res.status(statuses_1.HTTP_STATUSES.NOT_FOUND_404).send();
        return;
    }
    const { sortBy = "createdAt", sortDirection = "desc", pageSize = 10, pageNumber = 1, } = req.query;
    const skip = (pageNumber - 1) * pageSize;
    const recivedComments = yield posts_service_1.postsService.getComments(sortBy, sortDirection, pageSize, skip, postId);
    const countedComments = yield posts_service_1.postsService.countAllComments(postId);
    const pagesCount = Math.ceil(countedComments / pageSize);
    const presentationComments = {
        pagesCount,
        page: Number(pageNumber),
        pageSize: Number(pageSize),
        totalCount: countedComments,
        items: recivedComments,
    };
    return res.status(statuses_1.HTTP_STATUSES.OK_200).send(presentationComments);
}));
exports.postsRouter.delete("/:id", authorisationMiddleware_1.authGuardMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isDeletedPost = yield posts_service_1.postsService.deletePost(id);
    if (!isDeletedPost) {
        res.status(statuses_1.HTTP_STATUSES.NOT_FOUND_404).send();
        return;
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.NO_CONTENT_204).send();
    }
}));
exports.postsRouter.put("/:id", authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    const changedPost = yield posts_service_1.postsService.updatePost(id, title, shortDescription, content, blogId);
    if (!changedPost) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
}));
