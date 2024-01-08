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
    apiKey: openaiApiKey
});
let thread = null;
let assistant_id = 'asst_VVpKXu5gpCnYd2v4y2jQ2sxm'; // Evan's
// let assistant_id: string = 'asst_erCT2flkmXQgmE6Ygqej4u5x' // Hao's (w/o Function Calling)
// let assistant_id: string = 'asst_n4XgjvXaoV6E6K0qM0ab2htj' // Hao's (w/o Function Calling)
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitRun(threadID, threadRunID, runStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        let run = yield openai.beta.threads.runs.retrieve(threadID, threadRunID);
        let i = 0;
        console.log('Initial Run in Wait', runStatus, run);
        while (run.status === runStatus) {
            console.log('------Run Status------\n', run.status);
            i += 1;
            yield sleep(2000);
            // Get the run status
            run = yield openai.beta.threads.runs.retrieve(threadID, threadRunID);
        }
        return run;
    });
}
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Get prompt from request
    const prompt = req.query.message;
    // If no thread yet, create thread.
    if (thread === null) {
        thread = yield openai.beta.threads.create();
    }
    else {
        console.log(thread.id);
    }
    // Add message to thread
    yield openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: prompt + 'Use the design_system function.'
    });
    // Create the run
    const threadRun = yield openai.beta.threads.runs.create(thread.id, {
        assistant_id
    });
    const run = yield waitRun(thread.id, threadRun.id, 'in_progress');
    switch (run.status) {
        case 'requires_action': {
            console.log('Required Action:', JSON.stringify(run.required_action));
            yield openai.beta.threads.runs.submitToolOutputs(thread.id, threadRun.id, {
                tool_outputs: [
                    {
                        tool_call_id: run.required_action.submit_tool_outputs.tool_calls[0].id,
                        output: '{success: "true"}'
                    }
                ]
            });
            const postRequiredActionRun = yield waitRun(thread.id, threadRun.id, 'completed');
            console.log(postRequiredActionRun.status);
            res
                .status(200)
                .json((_a = run.required_action) === null || _a === void 0 ? void 0 : _a.submit_tool_outputs.tool_calls[0].function.arguments);
            break;
        }
        case 'completed': {
            const messages = yield openai.beta.threads.messages.list(thread.id);
            const newestMessageContent = messages.data[0]
                .content[0];
            res.status(200).json(newestMessageContent.text.value);
            break;
        }
        default:
            break;
    }
    const tempRun = yield openai.beta.threads.runs.retrieve(thread.id, threadRun.id);
    console.log('Final Run', tempRun);
}));
exports.default = router;
// queued --> in_progress --> requires_action --> completed --> queued (waiting for the next msg)
// queued --> in_progress --> requires_action --> completed --> in_progress (waiting for the next msg)
