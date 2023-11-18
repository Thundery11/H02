"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const testing_all_data_1 = require("./routes/testing-all-data");
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const users_router_1 = require("./routes/users-router/users-router");
const auth_router_1 = require("./routes/auth-router/auth-router");
const comments_router_1 = require("./routes/comments-router/comments-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.settings = {
    JWT_SECRET: process.env.JWT_SECRET || "123",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_SECRET || "234",
};
exports.app.use(express_1.default.json());
exports.app.use("/testing/all-data", testing_all_data_1.testingAllDataRouter);
exports.app.use("/blogs", blogs_router_1.blogsRouter);
exports.app.use("/posts", posts_router_1.postsRouter);
exports.app.use("/users", users_router_1.usersRouter);
exports.app.use("/auth", auth_router_1.authRouter);
exports.app.use("/comments", comments_router_1.commentsRouter);
exports.app.use((0, cookie_parser_1.default)());
