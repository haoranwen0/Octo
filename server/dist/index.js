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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
var cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Cor middleware allowing all origin access
app.use(cors());
// Get env variables
const port = process.env.PORT;
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({
    apiKey: openaiApiKey,
});
function checkThreadStatus(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const { threadId, runId } = ids;
        const runStatus = yield openai.beta.threads.runs.retrieve(threadId, runId);
        // console.log(runStatus);
        if (runStatus.status === "completed") {
            // console.log("COMPLETED");
            const messages = yield openai.beta.threads.messages.list(threadId);
            // console.log(messages);
            return messages;
        }
        // console.log("NOT COMPLETED");
        return null;
    });
}
// Basic OpenAI completion API
function openaiAssistantApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const assistant = yield openai.beta.assistants.create({
            name: "System Design Model Assistant",
            instructions: `### System Design Model Chatbot: Overview

**Primary Function**: The System Design Model Chatbot is an AI-powered assistant designed to return system design solutions in JSON formats. The assistant will use its knowledge of system design, and return a custom JSON formatted design model, which can then be used to render in the web as a diagram. The assistant should JUST return the JSON object and nothing else. This JSON object is served to a frontend that directly takes it and renders it out.

### Examples
User: I'm trying to build an e-commerce clothing brand online. There will be roughly 2,000 active users monthly. I want to use a NoSQL database, and cloud computing services that have free trials as I am only building this for a project right now. What are the frontend and backend components needed?

Assistant: {
     "nodes": [
          { "description": "Client", "block": "square", "id": "b28f38e1-5aa6-4072-90e5-3174846bf81a" },
          { "description": "AWS Amplify", "block": "square", "id": "accd389d-b6b5-4f28-87de-d5a1d9e52229" },
          { "description": "AWS DynamoDB", "block": "square", "id": "5c8b1b1d-f33a-4be3-bff3-8d2ca6e9fe1d" },
     ],
     "graph": {
          "b28f38e1-5aa6-4072-90e5-3174846bf81a": [
               "accd389d-b6b5-4f28-87de-d5a1d9e52229"
          ],
          "accd389d-b6b5-4f28-87de-d5a1d9e52229": [
               "5c8b1b1d-f33a-4be3-bff3-8d2ca6e9fe1d"
          ]          
     }
}

`,
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-1106-preview",
        });
        const thread = yield openai.beta.threads.create();
        const message = yield openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: "I want an build an ecommerce store selling shoes. What components are needed?",
        });
        const run = yield openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
        });
        const runStatus = yield openai.beta.threads.runs.retrieve(thread.id, run.id);
        // console.log({ runStatus });
        const messages = yield openai.beta.threads.messages.list(thread.id);
        console.log({
            assistant_id: assistant.id,
            thread_id: thread.id,
            run_id: run.id,
        });
        return messages;
    });
}
app.get("/testing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield checkThreadStatus({
        assistantId: "asst_shjqrknfXiZAGqiW6vSO3xvA",
        threadId: "thread_7B3uDpQ6700Xo4kSbMv9Luz5",
        runId: "run_trZJaPd3l6xSDd66KChYWO1O",
    });
    console.log(messages);
    res.json(messages);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
