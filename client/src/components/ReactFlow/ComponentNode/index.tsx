import React, { memo } from 'react'

import { Box, Grid, Stack, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import { Handle, Position, type NodeProps, NodeResizer } from 'reactflow'

import type { NodeData } from '../../../types'

const CustomNode: React.FC<NodeProps<NodeData>> = (props) => {
  const data = props.data
  const selected = props.selected

  return (
    <Box
      width='100%'
      height='100%'
      paddingX='1rem'
      paddingY='0.5rem'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius='0.375rem'
      sx={{ backgroundColor: 'white', cursor: 'move' }}
    >
      <NodeResizer color='#ff0071' isVisible={selected} />
      <Stack
        width='100%'
        height='100%'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
      >
        <Grid borderRadius='100%' alignItems='center' justifyContent='center'>
          <Box
            component='img'
            src={data.icon}
            width='2.5rem'
            height='2.5rem'
            marginRight='0.5rem'
            sx={{ objectFit: 'contain' }}
          />
        </Grid>
        <Typography variant='body1' fontSize='0.875rem'>
          {data.label}
        </Typography>
      </Stack>
      <Handle
        type='source'
        position={Position.Left}
        id={`${props.id}-handle-left`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Right}
        id={`${props.id}-handle-right`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Top}
        id={`${props.id}-handle-top`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id={`${props.id}-handle-bottom`}
        style={{ backgroundColor: teal[400] }}
      />
    </Box>
  )
}

export default memo(CustomNode)
