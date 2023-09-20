"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const blogs_repository_1 = require("../repositories/blogs.repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(blogs_repository_1.blogsRepository.getAllBlogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const blog = blogs_repository_1.blogsRepository.findBlog(req.params.id);
    if (!blog) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.OK_200).send(blog);
    }
});
