import { useState } from 'react'
import { Button, Box, TextField, Typography, Stack } from '@mui/material'
import { IRootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { addToChat } from '../../redux/slices/chat-slice'
import { Message } from '../../interfaces'
import { grey, blue } from '@mui/material/colors'

const Chat = () => {
  const dispatch = useDispatch()
  const conversation = useSelector((store: IRootState) => store.chat.value)

  const [message, setMessage] = useState<string>('')

  async function onSubmit() {
    const serializedMessage: Message = {
      role: 'user',
      content: message,
    }
    dispatch(addToChat(serializedMessage))
  }

  return (
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
        <Stack marginTop='auto' spacing={1} component='form'>
          <TextField
            id='filled-multiline-static'
            label='Describe your system'
            multiline
            rows={4}
            value={message}
            variant='filled'
            className='w-full'
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: grey[200],
              },
              '.MuiInputBase-input': {
                fontSize: '0.875rem',
              },
            }}
          />
          <Button
            fullWidth
            variant='contained'
            sx={{ textTransform: 'none' }}
            size='small'
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Chat
