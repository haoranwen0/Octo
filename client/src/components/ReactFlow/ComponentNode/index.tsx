import React, { memo } from 'react'

import { Box, Typography } from '@mui/material'
import { Handle, Position, type NodeProps } from 'reactflow'

import type { NodeData } from '../../../interfaces'

const CustomNode: React.FC<NodeProps<NodeData>> = (props) => {
  const data = props.data

  return (
    <Box className='px-4 py-2 rounded-md bg-white border-2 border-stone-400'>
      <Box component='div' className='flex items-center'>
        <Box component='div' className='rounded-full grid place-content-center'>
          <Box
            component='img'
            src={data.icon}
            className='w-12 h-12 object-contain mr-2'
          />
        </Box>
        <Typography variant='body1'>{data.label}</Typography>
      </Box>
      <Handle
        id={`${props.id}-handle-top`}
        type='source'
        position={Position.Top}
        className='!bg-teal-500'
      />
      <Handle
        id={`${props.id}-handle-bottom`}
        type='source'
        position={Position.Bottom}
        className='!bg-teal-500'
      />
    </Box>
  )
}

export default memo(CustomNode)
