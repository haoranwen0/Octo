import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { ChatStatusInput } from "./interfaces/run-status";
var cors = require("cors");

dotenv.config();

const app: Express = express();
// Cor middleware allowing all origin access
app.use(cors());

// Get env variables
const port = process.env.PORT;
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

async function checkThreadStatus(ids: ChatStatusInput) {
  const { threadId, runId } = ids;
  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  // console.log(runStatus);
  if (runStatus.status === "completed") {
    // console.log("COMPLETED");
    const messages = await openai.beta.threads.messages.list(threadId);
    // console.log(messages);
    return messages;
  }
  // console.log("NOT COMPLETED");
  return null;
}

// Basic OpenAI completion API
async function openaiAssistantApi() {
  const assistant = await openai.beta.assistants.create({
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

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content:
      "I want an build an ecommerce store selling shoes. What components are needed?",
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

  // console.log({ runStatus });

  const messages = await openai.beta.threads.messages.list(thread.id);

  console.log({
    assistant_id: assistant.id,
    thread_id: thread.id,
    run_id: run.id,
  });

  return messages;
}

app.get("/testing", async (req: Request, res: Response) => {
  const messages = await checkThreadStatus({
    assistantId: "asst_shjqrknfXiZAGqiW6vSO3xvA",
    threadId: "thread_7B3uDpQ6700Xo4kSbMv9Luz5",
    runId: "run_trZJaPd3l6xSDd66KChYWO1O",
  });

  console.log(messages);

  res.json(messages);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
