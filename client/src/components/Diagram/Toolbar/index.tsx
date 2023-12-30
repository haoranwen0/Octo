import { useState, FC } from 'react'
import {
  Stack,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Node } from 'reactflow'

import { Component, Shape, Font } from '../../../types'
import { componentImageLink } from '../../../data/component-images'

interface IToolbarComponent {
  numNodes: number
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void
}

const Toolbar: FC<IToolbarComponent> = ({ numNodes, setNodes }) => {
  const [component, setComponent] = useState<Component | ''>('')
  const [shape, setShape] = useState<Shape | ''>('')
  const [font, setFont] = useState<Font | ''>('')
  const [fontSize, setFontSize] = useState<number>(16)

  const getComponent = (
    comp: Component | Shape,
    type: 'shape' | 'component'
  ): Node => {
    console.log({
      id: (numNodes + 1).toString(),
      type: type === 'shape' ? 'ShapeNode' : 'CustomNode',
      position: { x: 0, y: 0 },
      data: {
        label: comp,
        icon: componentImageLink[comp as Component],
        ...(type === 'shape' && { shape: comp }),
      },
    })
    return {
      id: (numNodes + 1).toString(),
      type: type === 'shape' ? 'ShapeNode' : 'CustomNode',
      position: { x: 0, y: 0 },
      data: {
        label: comp,
        icon: componentImageLink[comp as Component],
        ...(type === 'shape' && { shape: comp }),
      },
      ...(type === 'shape' && {
        width: 8,
        height: 8,
      }),
    }
  }

  const handleSelectChange = (e: SelectChangeEvent): void => {
    // destructure to get name and value of select input
    const { name, value } = e.target

    // set the right select value accordingly
    switch (name) {
      case 'component':
        setComponent(value as Component)
        setNodes((prevNoeds) => [
          ...prevNoeds,
          getComponent(value as Component, 'component'),
        ])
        break
      case 'shape':
        setShape(value as Shape)
        setNodes((prevNoeds) => [
          ...prevNoeds,
          getComponent(value as Shape, 'shape'),
        ])
        break
      case 'font':
        setFont(value as Font)
        break
    }
  }

  return (
    <Stack
      direction='row'
      marginBottom='1rem'
      borderBottom='1px solid'
      borderColor={grey[200]}
      sx={{
        backgroundColor: grey[50],
      }}
    >
      <Box
        width='12rem'
        padding='0.5rem'
        borderRight='1px solid'
        borderColor={grey[200]}
      >
        <FormControl size='small' fullWidth>
          <InputLabel id='diagram-toolbar-select-components'>
            Components
          </InputLabel>
          <Select
            labelId='diagram-toolbar-select-components'
            id='diagram-toolbar-select'
            label='Components'
            name='component'
            value={component}
            onChange={handleSelectChange}
          >
            <MenuItem value='aws-database'>AWS Database</MenuItem>
            <MenuItem value='server'>Server</MenuItem>
            <MenuItem value='user'>User</MenuItem>
            <MenuItem value='load-balancer'>Load Balancer</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        width='12rem'
        padding='0.5rem'
        borderRight='1px solid'
        borderColor={grey[200]}
      >
        <FormControl size='small' fullWidth>
          <InputLabel id='diagram-toolbar-select-shapes'>Shapes</InputLabel>
          <Select
            labelId='diagram-toolbar-select-shapes'
            id='diagram-toolbar-select'
            label='Shapes'
            name='shape'
            value={shape}
            onChange={handleSelectChange}
          >
            <MenuItem value='rectangle'>Rectangle</MenuItem>
            <MenuItem value='circle'>Circle</MenuItem>
            <MenuItem value='square'>Square</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        width='12rem'
        padding='0.5rem'
        borderRight='1px solid'
        borderColor={grey[200]}
      >
        <FormControl size='small' fullWidth>
          <InputLabel id='diagram-toolbar-select-fonts'>Fonts</InputLabel>
          <Select
            labelId='diagram-toolbar-select-fonts'
            id='diagram-toolbar-select'
            label='Fonts'
            name='font'
            value={font}
            onChange={handleSelectChange}
          >
            <MenuItem value='times-new-roman'>Times New Roman</MenuItem>
            <MenuItem value='arial'>Arial</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box width='12rem' padding='0.5rem'>
        <Stack
          direction='row'
          alignItems='center'
          height='2.5rem'
          border='1px solid'
          borderColor={grey[400]}
          borderRadius='0.25rem'
        >
          <Button
            onClick={() =>
              fontSize > 0 && setFontSize((prevState) => prevState - 1)
            }
          >
            -
          </Button>
          <Typography flex='1' textAlign='center'>
            {fontSize}pt
          </Typography>
          <Button
            onClick={() =>
              fontSize < 128 && setFontSize((prevState) => prevState + 1)
            }
          >
            +
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Toolbar
