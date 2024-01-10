import React, {
  Fragment,
  useState,
  useRef,
  memo,
  type ChangeEvent
} from 'react'

import { Box, Stack, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { NodeResizer, type NodeProps } from 'reactflow'

import type { NodeData } from '../../../interfaces'

const TextNode: React.FC<NodeProps<NodeData>> = (props) => {
  const selected = props.selected

  const textfieldRef = useRef<HTMLDivElement>(null)

  const [editing, setEditing] = useState<boolean>(false)
  const [label, setLabel] = useState(
    props.data.label !== '' ? props.data.label : 'Write here'
  )

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLabel(event.target.value)
  }

  return (
    <Stack
      sx={{ backgroundColor: 'white' }}
      // width='100%'
      height='100%'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius='0.375rem'
      justifyContent='center'
      alignItems='center'
      padding='1rem'
    >
      <NodeResizer color='#ff0071' isVisible={selected && !editing} />
      {editing ? (
        <TextField
          id='outlined-multiline-flexible'
          multiline
          fullWidth
          value={label}
          onChange={handleTextChange}
          inputProps={{ style: { textAlign: 'center' } }}
          ref={textfieldRef}
          autoFocus
          onBlur={() => {
            setEditing(false)
          }}
          className='nodrag'
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: textfieldRef.current?.clientHeight,
            padding: '1.03125rem 0.875rem',
            backgroundColor: 'red'
          }}
          onDoubleClick={() => {
            setEditing(true)
          }}
        >
          <Typography variant='body1' textAlign='center' color='#000000DE'>
            {label}
          </Typography>
        </div>
      )}
    </Stack>
  )
}

export default memo(TextNode)
