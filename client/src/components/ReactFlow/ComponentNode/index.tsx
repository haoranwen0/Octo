import { ReactElement, memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { NodeData } from '../../../interfaces'
import { Container, Box, Typography } from '@mui/material'

function CustomNode(props: NodeProps<NodeData>): ReactElement {
  const data = props.data

  return (
    <Container
      component='div'
      className='px-4 py-2 rounded-md bg-white border-2 border-stone-400'
    >
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
        className='w-16 !bg-teal-500'
      />
      <Handle
        id={`${props.id}-handle-bottom`}
        type='source'
        position={Position.Bottom}
        className='w-16 !bg-teal-500 h-4'
      />
    </Container>
  )
}

export default memo(CustomNode)
