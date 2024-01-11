import React, { useState, type Dispatch, type SetStateAction } from 'react'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { isValidJSON } from '../../functions'
import { initializeCanvas } from '../../redux/slices/canvas-slice'
import { addToChat } from '../../redux/slices/chat-slice'
import type { IRootState } from '../../redux/store'
import type { JSONComponent, Message } from '../../types'

interface IUseChatReturnType {
  message: string
  loading: boolean
  setMessage: Dispatch<SetStateAction<string>>
  onSubmit: () => Promise<void>
}

export default function useChat(): IUseChatReturnType {
  const dispatch = useDispatch()
  const canvas = useSelector((store: IRootState) => store.canvas.value)
  const messages = useSelector((store: IRootState) => store.chat.value)

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(): Promise<void> {
    const serializedMessage: Message = {
      role: 'user',
      content: message
    }

    dispatch(addToChat(serializedMessage))

    setLoading(true)

    const prevMessages = messages.filter((item) => item.role !== 'octo')

    try {
      const startTime = performance.now()

      console.log(prevMessages)

      const response = await axios.get('http://localhost:8000/diagram', {
        params: {
          prevMessages: JSON.stringify(prevMessages),
          message
        }
      })

      console.log('Time Elapsed:', performance.now() - startTime)

      const diagram: string = response.data

      if (isValidJSON(diagram)) {
        const resJSON = JSON.parse(diagram)
        // if (canvas === null) {
        dispatch(initializeCanvas(resJSON.components as JSONComponent[]))

        const diagramSerialized: Message = {
          role: 'assistant',
          content: JSON.stringify(resJSON)
        }

        dispatch(addToChat(diagramSerialized))

        // if (resJSON.type === 'create') {
        //   dispatch(
        //     addToChat({
        //       role: 'octo',
        //       content: 'Diagram created!'
        //     })
        //   )
        // }
      }
    } catch (error) {
      console.error('Error :(', error)
    }

    setLoading(false)
  }

  return {
    message,
    loading,
    setMessage,
    onSubmit
  }
}
