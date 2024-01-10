import React, { useState, useRef, memo, type ChangeEvent } from 'react'

import { Stack, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { NodeResizer, type NodeProps } from 'reactflow'

import type { NodeData } from '../../../interfaces'
import EditableText from '../EditableText'

const TextNode: React.FC<NodeProps<NodeData>> = (props) => {
  const [editing, setEditing] = useState<boolean>(false)

  return (
    <Stack
      sx={{ backgroundColor: 'white', cursor: 'move' }}
      height='100%'
      border='2px solid'
      borderColor={grey[400]}
      borderRadius='0.375rem'
      justifyContent='center'
      alignItems='center'
      padding='1rem'
    >
      <NodeResizer color='#ff0071' isVisible={props.selected && !editing} />
      <EditableText
        nodeID={props.id}
        label={props.data.label}
        editing={editing}
        setEditing={setEditing}
      />
    </Stack>
  )
}

export default memo(TextNode)
