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
exports.testingAllDataRouter = void 0;
const express_1 = require("express");
const blogsDb_1 = require("../repositories/dataBase/blogsDb");
exports.testingAllDataRouter = (0, express_1.Router)({});
exports.testingAllDataRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        blogsDb_1.BlogModel.deleteMany({}),
        blogsDb_1.PostModel.deleteMany({}),
        blogsDb_1.UserModel.deleteMany({}),
        blogsDb_1.CommentsModel.deleteMany({}),
        blogsDb_1.SecurityDevicesModel.deleteMany({}),
        blogsDb_1.RequestsToApiModel.deleteMany({}),
        blogsDb_1.RecoveryCodeForNewPasswordModel.deleteMany({}),
        blogsDb_1.LikesModel.deleteMany({}),
    ]);
    res.send(204);
}));
