"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingAllDataRouter = void 0;
const express_1 = require("express");
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const posts_db_repository_1 = require("../repositories/posts-db-repository");
exports.testingAllDataRouter = (0, express_1.Router)({});
exports.testingAllDataRouter.delete('/', (req, res) => {
    blogs_db_repository_1.__blogsDb.length = 0;
    posts_db_repository_1.postsDb.length = 0;
    res.send(204);
});
