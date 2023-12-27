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
    console.log(`../../../images/${comp}.png`)
    return {
      id: (numNodes + 1).toString(),
      type: type === 'shape' ? 'default' : 'CustomNode',
      position: { x: 0, y: 0 },
      data: {
        label: comp,
        icon: `../../../images/${comp}.png`,
      },
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
      {/* Dropdown for node selection */}
      {/* <select
        // value={selectedIcon}
        // onChange={(e) => handleIconSelection(e.target.value)}
        style={{
          padding: "8px",
        }}
      >
        <option value="" disabled hidden>
          Icons
        </option>
        <option value=""></option>
        <option value="aws-db">AWS DB</option>
        <option value="server">Server</option>
        <option value="user">User</option>
        <option value="loadbalancer">Load Balancer</option>
      </select> */}

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

      {/* Dropdown for shape selection */}
      {/* <select
        // value={selectedShape}
        // onChange={(e) => handleShapeSelection(e.target.value)}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "8px",
        }}
      >
        <option value="" disabled hidden>
          Shapes
        </option>
        <option value=""></option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
      </select> */}

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

      {/* Dropdown for font type selection */}
      {/* <select
        // value={selectedFontType}
        // onChange={(e) => handleFontTypeSelection(e.target.value)}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "8px",
        }}
      >
        <option value="" disabled hidden>
          Fonts
        </option>
        <option value=""></option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Arial">Arial</option>
      </select> */}

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

      {/* Font displayer with +/- buttons */}
      {/* <div style={{ display: "flex", alignItems: "center" }}> */}
      {/* <button onClick={() => handleFontSizeChange(1)}>+</button> */}
      {/* <button>+</button> */}
      {/* <div style={{ margin: "0 8px" }}>Font Size: {fontSize}</div> */}
      {/* <div style={{ margin: "0 8px" }}>Font Size: 1px</div> */}
      {/* <button onClick={() => handleFontSizeChange(-1)}>-</button> */}
      {/* <button>-</button> */}
      {/* </div> */}

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
