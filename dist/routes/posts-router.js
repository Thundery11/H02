"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => {
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(posts_repository_1.postsRepository.getAllPosts);
});
exports.postsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = posts_repository_1.postsRepository.getPost(id);
    if (!post) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.OK_200).send(post);
    }
});
exports.postsRouter.post('/', (req, res) => {
    let { title, shortDescription, content, blogId, blogName } = req.body;
    const createdPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId, blogName);
    res.send(createdPost);
});
