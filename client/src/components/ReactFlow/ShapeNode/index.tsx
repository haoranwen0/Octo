import { useEffect, FC, memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow'
import { NodeData } from '../../../interfaces'
import { grey } from '@mui/material/colors'

const ShapeNode: FC<NodeProps<NodeData>> = (props) => {
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
        id={`${props.id}-handle-top`}
        type='source'
        position={Position.Top}
      />
      <Handle
        id={`${props.id}-handle-left`}
        type='source'
        position={Position.Left}
      />
      <Handle
        id={`${props.id}-handle-bottom`}
        type='source'
        position={Position.Bottom}
      />
      <Handle
        id={`${props.id}-handle-right`}
        type='source'
        position={Position.Right}
      />
    </Box>
  )
}

export default memo(ShapeNode)
