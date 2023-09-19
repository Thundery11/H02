"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingAllDataRouter = void 0;
const express_1 = require("express");
const posts_db_1 = require("../db/posts-db");
exports.testingAllDataRouter = (0, express_1.Router)({});
exports.testingAllDataRouter.delete('/', (req, res) => {
    posts_db_1.postsDb.length = 0;
    res.send(204);
});
