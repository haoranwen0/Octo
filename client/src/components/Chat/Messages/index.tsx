import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { blue, grey, purple } from '@mui/material/colors'
import { useSelector } from 'react-redux'

import type { Message } from '../../../interfaces'
import type { IRootState } from '../../../redux/store'

const Messages: React.FC = () => {
  const conversation = useSelector((store: IRootState) => store.chat.value)

  return (
    <>
      {conversation.map((message: Message, index: number) => {
        return (
          <Stack direction='row' width='100%' key={index}>
            {message.role === 'user' ? (
              <React.Fragment>
                <Box
                  flex='1'
                  padding='0.5rem'
                  borderRadius='0.5rem'
                  sx={{ backgroundColor: grey[100] }}
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
              </React.Fragment>
            ) : message.role === 'octo' ? (
              <React.Fragment>
                <Typography
                  display='block'
                  fontSize='0.875rem'
                  textAlign='center'
                  width='100%'
                >
                  {message.content}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Stack>
        )
      })}
    </>
  )
}

export default Messages
