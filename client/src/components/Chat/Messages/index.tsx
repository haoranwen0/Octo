import React, { Fragment } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { blue, purple, grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'

import type { IRootState } from '../../../redux/store'
import type { Message } from '../../../types'

const Messages: React.FC = () => {
  const conversation = useSelector((store: IRootState) => store.chat.value)

  return (
    <>
      {conversation.map((message: Message, index: number) => {
        const isUserMessage = message.role === 'user'

        return (
          <Stack
            direction={isUserMessage ? 'row' : 'row-reverse'}
            width='100%'
            key={index}
          >
            <Fragment>
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
                  {isUserMessage
                    ? message.content
                    : JSON.parse(message.content).description}
                </Typography>
              </Box>
              <Box
                width='2rem'
                height='2rem'
                borderRadius='100%'
                marginLeft={isUserMessage ? '0.5rem' : '0'}
                marginRight={!isUserMessage ? '0.5rem' : '0'}
                sx={{
                  backgroundColor: isUserMessage ? blue[400] : purple[400]
                }}
              />
            </Fragment>
          </Stack>
        )
      })}
    </>
  )
}

export default Messages
