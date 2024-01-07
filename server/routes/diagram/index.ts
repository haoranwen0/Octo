import { Request, Response, Router } from 'express'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import { ChatCompletionMessageToolCall } from 'openai/resources/chat/completions'

import { gptDiagramInst, gptDiagramJSONFn } from './data'

dotenv.config()

const router = Router()

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey })

type Message = {
  role: 'user'
  content: string
}

const getGPTDiagramJSONCompletion = async (
  message: Message
): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: gptDiagramInst
      },
      message
    ],
    tools: [
      {
        type: 'function',
        function: gptDiagramJSONFn
      }
    ],
    tool_choice: {
      type: 'function',
      function: {
        name: 'design_system'
      }
    }
  })

  console.log(JSON.stringify(completion))

  const toolCallsOutput: ChatCompletionMessageToolCall =
    completion.choices[0].message.tool_calls![0]

  return toolCallsOutput.function.arguments
}

router.get('/', async (req: Request, res: Response) => {
  const prompt = req.query.message as string
  const message: Message = {
    role: 'user',
    content: prompt
  }

  try {
    const result = await getGPTDiagramJSONCompletion(message)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router
