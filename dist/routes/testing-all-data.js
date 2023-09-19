"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingAllDataRouter = void 0;
const express_1 = require("express");
exports.testingAllDataRouter = (0, express_1.Router)({});
exports.testingAllDataRouter.delete('/', (req, res) => {
    db.length = 0;
    res.send(204);
});
