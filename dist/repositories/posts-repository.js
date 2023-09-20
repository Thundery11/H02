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
    createPost(title, shortDescription, content, blogId) {
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
    },
    deletePost(id) {
        for (let i = 0; i < exports.postsDb.length; i++) {
            if (exports.postsDb[i].id === id) {
                exports.postsDb.splice(i, 1);
                return;
            }
        }
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const updatingPost = exports.postsDb.find(p => p.id === id);
        if (updatingPost) {
            updatingPost.title = title;
            updatingPost.shortDescription = shortDescription;
            updatingPost.content = content;
            updatingPost.blogId = blogId;
        }
        return;
    }
};
