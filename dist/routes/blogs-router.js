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
exports.blogsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../types/statuses");
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const blogs_input_vadation_1 = require("../middlewares/blogs-input-vadation");
const erros_validation_1 = require("../middlewares/erros-validation");
const authorisationMiddleware_1 = require("../middlewares/authorisationMiddleware");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogs_db_repository_1.blogsRepository.getAllBlogs();
    res.status(statuses_1.HTTP_STATUSES.OK_200).send(allBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_db_repository_1.blogsRepository.findBlog(req.params.id);
    if (!blog) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.status(statuses_1.HTTP_STATUSES.OK_200).send(blog);
    }
}));
exports.blogsRouter.post('/', authorisationMiddleware_1.authGuardMiddleware, (0, blogs_input_vadation_1.blogsInputValidation)(), erros_validation_1.errosValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = yield blogs_db_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(createdBlog);
}));
exports.blogsRouter.delete('/:id', authorisationMiddleware_1.authGuardMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isDeletedBlog = yield blogs_db_repository_1.blogsRepository.deleteBlog(id);
    if (!isDeletedBlog) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
}));
exports.blogsRouter.put('/:id', authorisationMiddleware_1.authGuardMiddleware, (0, blogs_input_vadation_1.blogsInputValidation)(), erros_validation_1.errosValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    const changedBlog = yield blogs_db_repository_1.blogsRepository.changeBlog(id, name, description, websiteUrl);
    if (!changedBlog) {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
}));
