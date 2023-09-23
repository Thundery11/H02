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
        if (!blog) {
            return false;
        }
        return true;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: Math.floor(Math.random() * 10000).toString(),
            name,
            description,
            websiteUrl
        };
        exports.blogsDb.push(newBlog);
        return newBlog;
    },
    deleteBlog(id) {
        const indexOfDeletedBlog = exports.blogsDb.findIndex(blog => blog.id === id);
        if (indexOfDeletedBlog === -1) {
            return false;
        }
        else {
            exports.blogsDb.splice(indexOfDeletedBlog, 1);
            return true;
        }
    },
    changeBlog(id, name, description, websiteUrl) {
        const changingBlog = exports.blogsDb.find(b => b.id === id);
        if (!changingBlog) {
            return false;
        }
        changingBlog.name = name;
        changingBlog.description = description;
        changingBlog.websiteUrl = websiteUrl;
        return true;
    }
};
