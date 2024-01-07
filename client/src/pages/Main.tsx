import React from 'react'

import { Box, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'

import { Chat, Diagram, Navbar } from '../components'

const Main: React.FC = () => {
  return (
    <Stack height='100vh' width='100%' borderRadius='0.5rem'>
      <Navbar />
      <Stack direction='row' flex='1' height='calc(100vh - 49px)' width='100%'>
        <Chat />
        <Diagram />
      </Stack>
    </Stack>
  )
}

export default Main
