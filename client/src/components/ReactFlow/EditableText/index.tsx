import React, {
  Fragment,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction
} from 'react'

import { TextField, Typography } from '@mui/material'

interface EditableTextProps {
  label: string
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}

const EditableText: React.FC<EditableTextProps> = (props) => {
  const textfieldRef = useRef<HTMLDivElement>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [label, setLabel] = useState<string>(props.label)

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
            padding: '1.03125rem 0.875rem'
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
    </Fragment>
  )
}

export default EditableText