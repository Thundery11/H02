"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogsDb = void 0;
exports.blogsDb = [{
        id: '0',
        name: "Ilya",
        description: "string",
        websiteUrl: "string"
    }];
exports.blogsRepository = {
    getAllBlogs() {
        return exports.blogsDb;
    },
    findBlog(id) {
        const blog = exports.blogsDb.find(i => i.id === id);
        return blog;
    },
    createBlog(newBlog) {
        exports.blogsDb.push(newBlog);
        return newBlog;
    },
    // name: string, description: string, websiteUrl: string
};
