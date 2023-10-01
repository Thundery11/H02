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
exports.postsRepository = exports.postsDb = void 0;
exports.postsDb = [{
        id: "334343",
        title: "what",
        shortDescription: "can",
        content: "i",
        blogId: "do",
        blogName: "string"
    }];
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.postsDb;
        });
    },
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.postsDb.find(i => i.id === id);
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: Math.floor(Math.random() * 10000).toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: "some blog"
            };
            exports.postsDb.push(newPost);
            return newPost;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const indexOfDeletedPost = exports.postsDb.findIndex(post => post.id === id);
            if (indexOfDeletedPost === -1) {
                return false;
            }
            else {
                exports.postsDb.splice(indexOfDeletedPost, 1);
                return true;
            }
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatingPost = exports.postsDb.find(p => p.id === id);
            if (!updatingPost) {
                return false;
            }
            updatingPost.title = title;
            updatingPost.shortDescription = shortDescription;
            updatingPost.content = content;
            updatingPost.blogId = blogId;
            return true;
        });
    }
};
