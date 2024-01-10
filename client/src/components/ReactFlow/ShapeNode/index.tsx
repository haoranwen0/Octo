import React, { memo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import { Handle, Position, NodeResizer, type NodeProps } from 'reactflow'

import type { NodeData } from '../../../interfaces'

const ShapeNode: React.FC<NodeProps<NodeData>> = (props) => {
  const data = props.data
  const selected = props.selected

  return (
    <Box
      width='100%'
      height='100%'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius={data.shape === 'circle' ? '100%' : '0.375rem'}
      sx={{ backgroundColor: 'white', cursor: 'move' }}
    >
      <NodeResizer color='#ff0071' isVisible={selected} />
      <Grid
        container
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Typography fontSize='0.875rem'>{data.shape}</Typography>
      </Grid>
      <Handle
        type='source'
        position={Position.Top}
        id={`${props.id}-handle-top`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Left}
        id={`${props.id}-handle-left`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id={`${props.id}-handle-bottom`}
        style={{ backgroundColor: teal[400] }}
      />
      <Handle
        type='source'
        position={Position.Right}
        id={`${props.id}-handle-right`}
        style={{ backgroundColor: teal[400] }}
      />
    </Box>
  )
}

export default memo(ShapeNode)
