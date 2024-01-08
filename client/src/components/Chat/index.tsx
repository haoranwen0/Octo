import React from 'react'

import { Button, TextField, Stack, CircularProgress } from '@mui/material'
import { grey } from '@mui/material/colors'

import Messages from './Messages'
import useChat from './useChat'

const Chat: React.FC = () => {
  const chatUtils = useChat()

  return (
    <Stack
      height='100%'
      width='300px'
      borderRight='1px solid'
      borderColor={grey[300]}
    >
      <Stack padding='0.5rem' sx={{ overflowY: 'auto' }} flex={1} spacing={1}>
        <Messages />
      </Stack>
      <Stack
        marginTop='auto'
        spacing={1}
        component='form'
        padding='0.5rem'
        height='fit-content'
      >
        <TextField
          id='filled-multiline-static'
          label='Describe your system'
          multiline
          rows={4}
          value={chatUtils.message}
          variant='filled'
          className='w-full'
          disabled={chatUtils.loading}
          onChange={(e) => {
            chatUtils.setMessage(e.target.value)
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: grey[100]
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
              await chatUtils.onSubmit()
            })()
          }}
          disabled={chatUtils.loading}
        >
          {chatUtils.loading ? <CircularProgress size='1.5rem' /> : 'Submit'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Chat;
