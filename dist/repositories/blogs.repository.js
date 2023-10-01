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
exports.blogsRepository = exports.blogsDb = void 0;
exports.blogsDb = [{
        id: '0',
        name: "Ilya",
        description: "string",
        websiteUrl: "string"
    }];
exports.blogsRepository = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogsDb;
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogsDb.find(i => i.id === id);
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: Math.floor(Math.random() * 10000).toString(),
                name,
                description,
                websiteUrl
            };
            exports.blogsDb.push(newBlog);
            return newBlog;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const indexOfDeletedBlog = exports.blogsDb.findIndex(blog => blog.id === id);
            if (indexOfDeletedBlog === -1) {
                return false;
            }
            else {
                exports.blogsDb.splice(indexOfDeletedBlog, 1);
                return true;
            }
        });
    },
    changeBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const changingBlog = exports.blogsDb.find(b => b.id === id);
            if (!changingBlog) {
                return false;
            }
            changingBlog.name = name;
            changingBlog.description = description;
            changingBlog.websiteUrl = websiteUrl;
            return true;
        });
    }
};
