import { useState } from "react"
import { Button, Box, TextField, Typography } from "@mui/material"
import { IRootState } from "../../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { addToChat } from "../../redux/slices/chat-slice"
import { Message } from "../../interfaces"

const Chat = () => {
  const dispatch = useDispatch()
  const conversation = useSelector((store: IRootState) => store.chat.value)

  const [message, setMessage] = useState<string>("")

  async function onSubmit() {
    const serializedMessage: Message = {
      role: "user",
      content: message,
    }
    dispatch(addToChat(serializedMessage))
  }

  return (
    // Outer wrapper
    <Box className="w-[400px] p-4 h-full">
      <Box className="bg-slate-50 rounded-lg h-full flex flex-col p-2">
        <Box display="flex" className="flex-col overflow-auto">
          {conversation.map((message: Message, index: number) => {
            return (
              <Box className="flex mb-2 w-full" key={index}>
                <div className="w-8 h-8 rounded-full bg-blue-200 mr-2 shadow-sm" />
                <Box className="flex-1">
                  <Typography
                    component="p"
                    display="block"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {message.content}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box className="mt-auto flex flex-col gap-2" component="form">
          <TextField
            id="filled-multiline-static"
            label="Describe your system"
            multiline
            rows={4}
            value={message}
            variant="filled"
            className="w-full"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" className="w-full" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat
