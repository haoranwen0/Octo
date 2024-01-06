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
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = require("./data");
dotenv_1.default.config();
const router = (0, express_1.Router)();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({ apiKey });
const getGPTDiagramJSONCompletion = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const completion = yield openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: data_1.gptDiagramAssistantInstruction
            },
            message
        ]
    });
    return completion.choices[0].message.content;
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.query.message;
    const message = {
        role: 'user',
        content: prompt
    };
    try {
        const result = yield getGPTDiagramJSONCompletion(message);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
