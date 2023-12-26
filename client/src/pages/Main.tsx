import { Box, Stack } from "@mui/material"
import { Chat, Diagram, Navbar } from "../components"
import { grey } from "@mui/material/colors"

const Main = () => {
  return (
    <Box padding="1rem" height="100vh" sx={{ backgroundColor: grey[900] }}>
      <Stack
        height="100%"
        sx={{ backgroundColor: grey[50] }}
        borderRadius="0.5rem"
      >
        <Navbar />
        <Stack direction="row" flex="1">
          <Chat />
          <Diagram />
        </Stack>
      </Stack>
    </Box>
  )
}

export default Main
