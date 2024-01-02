import React, { useState } from 'react'

import { Button, Box, TextField, Typography, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import type { Message } from '../../interfaces'
import { addToChat } from '../../redux/slices/chat-slice'
import type { IRootState } from '../../redux/store'

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const conversation = useSelector((store: IRootState) => store.chat.value)

  const [message, setMessage] = useState<string>('')

  async function onSubmit(): Promise<void> {
    const serializedMessage: Message = {
      role: 'user',
      content: message
    }
    dispatch(addToChat(serializedMessage))
    try {
      const response = await axios.get('http://localhost:8000/gptResponse', {
        params: {
          message
        }
      })
      const diagram: string = response.data
      console.log('diagram: ', diagram)
      const diagramSerialized: Message = {
        role: 'assistant',
        content: diagram
      }
      dispatch(addToChat(diagramSerialized))
    } catch (error) {
      console.error('Error :(')
    }
  }

  return (
    // Outer wrapper
    <Box
      padding='0.5rem'
      height='100%'
      width='300px'
      borderRadius='0 0 0 0.5rem'
      borderRight='1px solid'
      borderColor={grey[200]}
    >
      <Stack justifyContent='space-between' height='100%'>
        <Stack overflow='auto'>
          {conversation.map((message: Message, index: number) => {
            return (
              <Stack
                direction='row'
                marginBottom='0.5rem'
                width='100%'
                key={index}
              >
                <div className='w-8 h-8 rounded-full bg-blue-200 mr-2 shadow-sm' />
                <Box flex='1'>
                  <Typography
                    component='p'
                    display='block'
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {message.content}
                  </Typography>
                </Box>
              </Stack>
            )
          })}
        </Stack>
        <Box className='mt-auto flex flex-col gap-2' component='form'>
          <TextField
            id='filled-multiline-static'
            label='Describe your system'
            multiline
            rows={4}
            value={message}
            variant='filled'
            className='w-full'
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <Button
            variant='contained'
            className='w-full'
            onClick={() => {
              void (async () => {
                await onSubmit()
              })()
            }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Chat
