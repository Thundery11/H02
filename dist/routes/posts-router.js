"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const posts_repository_1 = require("../repositories/posts-repository");
const posts_input_validation_1 = require("../middlewares/posts-input-validation");
const erros_validation_1 = require("../middlewares/erros-validation");
const authorisationMiddleware_1 = require("../middlewares/authorisationMiddleware");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => {
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(posts_repository_1.postsRepository.getAllPosts());
});
exports.postsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = posts_repository_1.postsRepository.getPost(id);
    if (!post) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.OK_200).send(post);
    }
});
exports.postsRouter.post('/', authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const createdPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdPost);
});
exports.postsRouter.delete('/:id', authorisationMiddleware_1.authGuardMiddleware, (req, res) => {
    const id = req.params.id;
    const isDeletedPost = posts_repository_1.postsRepository.deletePost(id);
    if (!isDeletedPost) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
});
exports.postsRouter.put('/:id', authorisationMiddleware_1.authGuardMiddleware, (0, posts_input_validation_1.postsInputValidation)(), erros_validation_1.errosValidation, (req, res) => {
    const id = req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    const changedPost = posts_repository_1.postsRepository.updatePost(id, title, shortDescription, content, blogId);
    if (!changedPost) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
});
