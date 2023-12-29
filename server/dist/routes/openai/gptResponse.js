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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openai_1 = __importDefault(require("openai"));
const router = (0, express_1.Router)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({
    apiKey: openaiApiKey,
});
let thread = null;
let assistant_id = "asst_VVpKXu5gpCnYd2v4y2jQ2sxm";
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
router.get("/gptResponse", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (thread === null) {
        thread = yield openai.beta.threads.create();
    }
    const message = yield openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: req.query.message,
    });
    const run = yield openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant_id,
    });
    console.log(run);
    while (true) {
        const runStatus = yield openai.beta.threads.runs.retrieve(thread.id, run.id);
        if (runStatus.status == "requires_action") {
            break;
        }
        yield sleep(2000);
    }
    const messages = yield openai.beta.threads.messages.list(thread.id);
    res.json(messages);
}));
exports.default = router;
