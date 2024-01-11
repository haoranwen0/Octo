import React, { useState, memo } from 'react'

import { Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { NodeResizer, type NodeProps } from 'reactflow'

import type { NodeData } from '../../../types'
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
        typography={props.data.typography}
        editing={editing}
        setEditing={setEditing}
      />
    </Stack>
  )
}

export default memo(TextNode)
