import { Request, Response, Router } from 'express'
import OpenAI from 'openai'
import dotenv from 'dotenv'

import { gptDiagramAssistantInstruction } from './data'

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
        content: gptDiagramAssistantInstruction
      },
      message
    ]
  })
  return completion.choices[0].message.content as string
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
