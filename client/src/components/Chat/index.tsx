import React, { useState } from 'react'

import { Button, Box, TextField, Typography, Stack } from '@mui/material'
import { grey, blue } from '@mui/material/colors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { isValidJSON } from '../../functions'
import type { Component, Message, GPTJSON } from '../../interfaces'
import { initializeCanvas } from '../../redux/slices/canvas-slice'
import { addToChat } from '../../redux/slices/chat-slice'
import type { IRootState } from '../../redux/store'

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const conversation = useSelector((store: IRootState) => store.chat.value)
  const canvas = useSelector((store: IRootState) => store.canvas.value)

  const [message, setMessage] = useState<string>('')

  async function onSubmit(): Promise<void> {
    const serializedMessage: Message = {
      role: 'user',
      content: message
    }
    dispatch(addToChat(serializedMessage))
    try {
      const startTime = performance.now()
      const response = await axios.get('http://localhost:8000/diagram-v2', {
        params: {
          message
        }
      })
      console.log('Time Elapsed:', performance.now() - startTime)

      const diagram: string = response.data

      // console.log('diagram:', diagram)

      if (isValidJSON(diagram)) {
        if (canvas === null) {
          dispatch(
            initializeCanvas(JSON.parse(diagram).components as Component[])
          )
        } else {
          console.log('Canvas already exists!')
          // TODO
        }
      }

      console.log('diagram: ', diagram)
      const diagramSerialized: Message = {
        role: 'assistant',
        content: diagram
      }
      dispatch(addToChat(diagramSerialized))
    } catch (error) {
      console.error('Error :(', error)
    }
  }

  return (
    <Box
      height='100%'
      width='300px'
      borderRadius='0 0 0 0.5rem'
      borderRight='1px solid'
      borderColor={grey[200]}
    >
      <Stack justifyContent='space-between' height='100%'>
        <Stack overflow='auto' padding='0.5rem'>
          {conversation.map((message: Message, index: number) => {
            return (
              <Stack
                direction='row'
                marginBottom='0.5rem'
                width='100%'
                key={index}
              >
                {message.role === 'user' ? (
                  <>
                    <Box
                      flex='1'
                      height='fit-content'
                      padding='0.5rem'
                      borderRadius='0.5rem'
                      sx={{ backgroundColor: grey[200] }}
                    >
                      <Typography
                        display='block'
                        fontSize='0.875rem'
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                    <Box
                      width='2rem'
                      height='2rem'
                      borderRadius='100%'
                      marginLeft='0.5rem'
                      sx={{ backgroundColor: blue[400] }}
                    />
                  </>
                ) : (
                  <>
                    <Box
                      width='2rem'
                      height='2rem'
                      borderRadius='100%'
                      marginRight='0.5rem'
                      sx={{ backgroundColor: blue[400] }}
                    />
                    <Box
                      flex='1'
                      height='fit-content'
                      padding='0.5rem'
                      borderRadius='0.5rem'
                      sx={{ backgroundColor: grey[200] }}
                    >
                      <Typography
                        display='block'
                        fontSize='0.875rem'
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            )
          })}
        </Stack>
        <Stack marginTop='auto' spacing={1} component='form' padding='0.5rem'>
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
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: grey[200]
              },
              '.MuiInputBase-input': {
                fontSize: '0.875rem'
              }
            }}
          />
          <Button
            fullWidth
            variant='contained'
            sx={{ textTransform: 'none' }}
            size='small'
            onClick={() => {
              void (async () => {
                await onSubmit()
              })()
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Chat
