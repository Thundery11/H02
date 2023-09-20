"use strict";
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
        return exports.postsDb;
    },
    getPost(id) {
        const post = exports.postsDb.find(i => i.id === id);
        return post;
    },
    createPost(title, shortDescription, content, blogId, blogName) {
        const newPost = {
            id: Math.floor(Math.random() * 10000).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        };
        exports.postsDb.push(newPost);
        return newPost;
    }
};
