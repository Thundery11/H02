"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const blogs_repository_1 = require("../repositories/blogs.repository");
const blogs_input_vadation_1 = require("../middlewares/blogs-input-vadation");
const erros_validation_1 = require("../middlewares/erros-validation");
const authorisationMiddleware_1 = require("../middlewares/authorisationMiddleware");
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
exports.blogsRouter.post('/', authorisationMiddleware_1.authGuardMiddleware, (0, blogs_input_vadation_1.blogsInputValidation)(), erros_validation_1.errosValidation, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdBlog);
});
exports.blogsRouter.delete('/:id', authorisationMiddleware_1.authGuardMiddleware, (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        blogs_repository_1.blogsRepository.deleteBlog(id);
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
});
exports.blogsRouter.put('/:id', authorisationMiddleware_1.authGuardMiddleware, (0, blogs_input_vadation_1.blogsInputValidation)(), erros_validation_1.errosValidation, (req, res) => {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    const changedBlog = blogs_repository_1.blogsRepository.changeBlog(id, name, description, websiteUrl);
    if (!changedBlog) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
});
