"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingAllDataRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs.repository");
exports.testingAllDataRouter = (0, express_1.Router)({});
exports.testingAllDataRouter.delete('/', (req, res) => {
    blogs_repository_1.blogsDb.length = 0;
    res.send(204);
});
