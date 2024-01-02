import React, { useState, memo, type ChangeEvent } from 'react'

import type { NodeData } from '../../../interfaces'

interface CustomNodeProps {
  data: NodeData
}

const TextNode: React.FC<CustomNodeProps> = (props) => {
  const [label, setLabel] = useState(
    props.data.label !== '' ? props.data.label : 'Write here'
  )

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLabel(event.target.value)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '100px',
        padding: '10px',
        border: '1px solid #ddd'
      }}
    >
      <input
        type='text'
        value={label}
        onChange={handleTextChange}
        style={{ width: '100%', marginBottom: '10px' }}
      />
    </div>
  )
}

export default memo(TextNode)
