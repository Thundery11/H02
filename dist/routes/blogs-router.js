"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const blogs_repository_1 = require("../repositories/blogs.repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.getAllBlogs();
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(allBlogs);
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
exports.blogsRouter.post('/', (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdBlog);
});
exports.blogsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    blogs_repository_1.blogsRepository.deleteBlog(id);
    res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.blogsRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    blogs_repository_1.blogsRepository.changeBlog(id, name, description, websiteUrl);
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
