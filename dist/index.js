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
exports.startApp = void 0;
const blogsDb_1 = require("./repositories/dataBase/blogsDb");
const settings_1 = require("./settings");
const port = process.env.PORT || 3000;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, blogsDb_1.runDb)();
    settings_1.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
exports.startApp = startApp;
(0, exports.startApp)();
