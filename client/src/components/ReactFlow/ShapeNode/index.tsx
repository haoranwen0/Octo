import { FC, memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Handle, Position } from 'reactflow'
import { NodeData } from '../../../interfaces'
import { grey } from '@mui/material/colors'

interface ShapeNodeProps {
  data: NodeData
}

const ShapeNode: FC<ShapeNodeProps> = (props) => {
  const data = props.data

  return (
    <Box
      width={data.shape === 'rectangle' ? '12rem' : '8rem'}
      height='8rem'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius={data.shape === 'circle' ? '100%' : '0.375rem'}
      sx={{ backgroundColor: 'white', cursor: 'move' }}
    >
      <Grid
        container
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Typography fontSize='0.875rem'>{data.shape}</Typography>
      </Grid>
      <Handle type='target' />
    </Box>
  )
}

export default memo(ShapeNode)
