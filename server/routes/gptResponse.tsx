import { Request, Response, Router } from "express";
import OpenAI from "openai";

const router = Router();
import dotenv from "dotenv";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

let thread: OpenAI.Beta.Thread | null = null;
let assistant_id: string = "asst_VVpKXu5gpCnYd2v4y2jQ2sxm";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get("/gptResponse", async (req: Request, res: Response) => {
  console.log(req.query.message);
  if (thread === null) {
    thread = await openai.beta.threads.create();
  }
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: req.query.message as string,
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant_id,
  });
  let runStatus = null;
  let i = 0; 
  while (true) {
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    if (runStatus.status == "requires_action") {
      break;
    }
    console.log("sleeping: ", i);
    i += 1
    await sleep(2000);
  }
  const messages = await openai.beta.threads.messages.list(thread.id);
  console.log("out here:", runStatus.required_action?.submit_tool_outputs.tool_calls[0].function.arguments);

  res.json(
    runStatus.required_action?.submit_tool_outputs.tool_calls[0].function
      .arguments
  );
});

export default router;
