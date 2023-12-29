import { FC, memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow'
import { NodeData } from '../../../interfaces'
import { grey } from '@mui/material/colors'

const ShapeNode: FC<NodeProps<NodeData>> = (props) => {
  const data = props.data
  const selected = props.selected

  return (
    <Box
      width={data.shape === 'rectangle' ? '12rem' : '8rem'}
      height='8rem'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius={data.shape === 'circle' ? '100%' : '0.375rem'}
      sx={{ backgroundColor: 'white', cursor: 'move' }}
    >
      <NodeResizer
        color='#ff0071'
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Grid
        container
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Typography fontSize='0.875rem'>{data.shape}</Typography>
      </Grid>
      <Handle type='target' position={Position.Top} />
      <Handle type='target' position={Position.Left} />
      <Handle type='target' position={Position.Bottom} />
      <Handle type='target' position={Position.Right} />
    </Box>
  )
}

export default memo(ShapeNode)
