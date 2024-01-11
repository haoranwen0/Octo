// prettier-ignore
import React, { Fragment, useRef, useState, useEffect, type Dispatch, type SetStateAction } from 'react'

import { TextField, Typography } from '@mui/material'
import { useReactFlow } from 'reactflow'

import type { Typography as TypographyT } from '../../../types'

interface EditableTextProps {
  nodeID: string
  label: string
  editing: boolean
  typography: TypographyT
  setEditing: Dispatch<SetStateAction<boolean>>
}

const EditableText: React.FC<EditableTextProps> = (props) => {
  const rf = useReactFlow()

  const textfieldRef = useRef<HTMLDivElement>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [label, setLabel] = useState<string>(props.label)
  const [textfieldHeight, setTextfieldHeight] = useState<number>(0)

  // const [test, setTest] = useState<boolean>(false)

  useEffect(() => {
    console.log(textfieldHeight)
  }, [textfieldHeight])

  return (
    <Fragment>
      {editing ? (
        <TextField
          id='outlined-multiline-flexible'
          multiline
          fullWidth
          value={label}
          onChange={(e) => {
            setLabel(e.target.value)
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiInputBase-input': {
              textAlign: 'center',
              fontSize: props.typography.fontSize,
              fontFamily: props.typography.font
            }
          }}
          inputRef={textfieldRef}
          autoFocus
          onBlur={() => {
            setEditing(false)
            textfieldRef.current !== null &&
              setTextfieldHeight(textfieldRef.current?.clientHeight)
            rf.setNodes((prevNodes) =>
              prevNodes.map((node) => {
                if (node.id === props.nodeID) {
                  node.data = { ...node.data, label }
                }
                return node
              })
            )
          }}
          className='nodrag'
        />
      ) : (
        <div
          style={{
            width: '100%',
            padding: '1.03125rem 0.875rem'
          }}
          onDoubleClick={() => {
            setEditing(true)
          }}
        >
          <Typography
            variant='body1'
            textAlign='center'
            color='#000000DE'
            whiteSpace='pre'
            // lineHeight='1.2'
            fontSize={props.typography.fontSize}
            fontFamily={props.typography.font}
            height={textfieldHeight}
          >
            {label}
          </Typography>
        </div>
      )}
    </Fragment>
  )
}

export default EditableText
