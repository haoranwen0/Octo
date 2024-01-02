import React from 'react'

import { Box, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'

import { Chat, Diagram, Navbar } from '../components'

const Main: React.FC = () => {
  return (
    <Box padding='1rem' height='100vh' sx={{ backgroundColor: grey[800] }}>
      <Stack
        height='100%'
        sx={{ backgroundColor: grey[50] }}
        borderRadius='0.5rem'
      >
        <Navbar />
        <Stack direction='row' flex='1'>
          <Chat />
          <Diagram />
        </Stack>
      </Stack>
    </Box>
  )
}

export default Main
