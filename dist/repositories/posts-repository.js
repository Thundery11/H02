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
        return exports.postsDb.find(i => i.id === id);
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
        const indexOfDeletedPost = exports.postsDb.findIndex(post => post.id === id);
        if (indexOfDeletedPost === -1) {
            return false;
        }
        else {
            exports.postsDb.splice(indexOfDeletedPost, 1);
            return true;
        }
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const updatingPost = exports.postsDb.find(p => p.id === id);
        if (!updatingPost) {
            return false;
        }
        updatingPost.title = title;
        updatingPost.shortDescription = shortDescription;
        updatingPost.content = content;
        updatingPost.blogId = blogId;
        return true;
    }
};
