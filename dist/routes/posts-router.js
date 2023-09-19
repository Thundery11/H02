"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.delete('/testing/all-data', (req, res) => {
    db_1.db.length = 0;
    res.send(204);
});
