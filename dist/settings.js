"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const testing_all_data_1 = require("./routes/testing-all-data");
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const users_router_1 = require("./routes/users-router/users-router");
const auth_router_1 = require("./routes/auth-router/auth-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/testing/all-data", testing_all_data_1.testingAllDataRouter);
exports.app.use("/blogs", blogs_router_1.blogsRouter);
exports.app.use("/posts", posts_router_1.postsRouter);
exports.app.use("/users", users_router_1.usersRouter);
exports.app.use("/auth", auth_router_1.authRouter);
