"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const gptResponse_1 = __importDefault(require("./gptResponse"));
exports.routes = express_1.default.Router();
exports.routes.use(gptResponse_1.default);
