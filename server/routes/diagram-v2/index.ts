import { Request, Response, Router } from 'express'
import OpenAI from 'openai'
import {
  ThreadMessage,
  ThreadMessagesPage,
  MessageContentText
} from 'openai/resources/beta/threads/messages/messages'
import { Run } from 'openai/resources/beta/threads/runs/runs'

const router = Router()
import dotenv from 'dotenv'

dotenv.config()

const openaiApiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: openaiApiKey
})

let thread: OpenAI.Beta.Thread | null = null
let assistant_id: string = 'asst_VVpKXu5gpCnYd2v4y2jQ2sxm' // Evan's
// let assistant_id: string = 'asst_erCT2flkmXQgmE6Ygqej4u5x' // Hao's (w/o Function Calling)
// let assistant_id: string = 'asst_n4XgjvXaoV6E6K0qM0ab2htj' // Hao's (w/o Function Calling)

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitRun(
  threadID: string,
  threadRunID: string,
  runStatus: string
): Promise<Run> {
  let run = await openai.beta.threads.runs.retrieve(threadID, threadRunID)
  let i = 0

  console.log('Initial Run in Wait', runStatus, run)

  while (run.status === runStatus) {
    console.log('------Run Status------\n', run.status)

    i += 1
    await sleep(2000)

    // Get the run status
    run = await openai.beta.threads.runs.retrieve(threadID, threadRunID)
  }

  return run
}

router.get('/', async (req: Request, res: Response) => {
  // Get prompt from request
  const prompt = req.query.message as string

  // If no thread yet, create thread.
  if (thread === null) {
    thread = await openai.beta.threads.create()
  } else {
    console.log(thread.id)
  }

  // Add message to thread
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: prompt + 'Use the design_system function.'
  })

  // Create the run
  const threadRun = await openai.beta.threads.runs.create(thread.id, {
    assistant_id
  })

  const run = await waitRun(thread.id, threadRun.id, 'in_progress')

  switch (run.status) {
    case 'requires_action': {
      console.log('Required Action:', JSON.stringify(run.required_action))
      await openai.beta.threads.runs.submitToolOutputs(
        thread.id,
        threadRun.id,
        {
          tool_outputs: [
            {
              tool_call_id:
                run.required_action!.submit_tool_outputs.tool_calls[0].id,
              output: '{success: "true"}'
            }
          ]
        }
      )

      const postRequiredActionRun = await waitRun(
        thread.id,
        threadRun.id,
        'completed'
      )

      console.log(postRequiredActionRun.status)

      res
        .status(200)
        .json(
          run.required_action?.submit_tool_outputs.tool_calls[0].function
            .arguments
        )
      break
    }

    case 'completed': {
      const messages: ThreadMessagesPage =
        await openai.beta.threads.messages.list(thread.id)
      const newestMessageContent = messages.data[0]
        .content[0] as MessageContentText
      res.status(200).json(newestMessageContent.text.value)
      break
    }

    default:
      break
  }

  const tempRun = await openai.beta.threads.runs.retrieve(
    thread.id,
    threadRun.id
  )

  console.log('Final Run', tempRun)
})

export default router
