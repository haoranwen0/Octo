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
let assistant: OpenAI.Beta.Assistant | null = null;
let thread: OpenAI.Beta.Thread | null = null;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/gptResponse", async (req: Request, res: Response) => {
  const message = await openai.beta.threads.messages.create(thread!.id, {
    role: "user",
    content: req.query.message as string,
  });
  const run = await openai.beta.threads.runs.create(thread!.id, {
    assistant_id: assistant!.id,
  });
  console.log(run);
  while (true) {
    const runStatus = await openai.beta.threads.runs.retrieve(
      thread!.id,
      run.id
    );
    if (runStatus.status == "completed") {
      break;
    }
    await sleep(2000);
  }
  const messages = await openai.beta.threads.messages.list(thread!.id);
  res.json(messages);
});

(async () => {
  // Perform asynchronous initialization
  assistant = await openai.beta.assistants.create({
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

  thread = await openai.beta.threads.create();

  // Start the server once the initialization is complete
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})();
