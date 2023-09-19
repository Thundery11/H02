"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const blogs_db_1 = require("../db/blogs-db");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const blog = blogs_db_1.blogsDb.find(b => b.id === id);
    if (!blog) {
        res.status(types_1.HTTP_STATUSES.NOT_FOUND_404).send(blog);
    }
});
