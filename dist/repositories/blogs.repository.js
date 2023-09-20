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
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: Math.random().toString(),
            name,
            description,
            websiteUrl
        };
        exports.blogsDb.push(newBlog);
        return newBlog;
    },
};
