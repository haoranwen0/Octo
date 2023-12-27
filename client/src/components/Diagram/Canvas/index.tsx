import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  OnConnect,
  MiniMap,
  Background,
  Controls,
  Connection,
  MarkerType,
} from 'reactflow'

import CustomNode from '../../react-flow-nodes/CustomeNode'
import TextNode from '../../react-flow-nodes/TextNode'
import Toolbar from '../Toolbar'

import 'reactflow/dist/style.css'

const nodeTypes = {
  CustomNode: CustomNode,
  TextNode: TextNode,
}

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'CustomNode',
    data: {
      label: 'AWS DynamoDB',
      icon: 'https://static-00.iconduck.com/assets.00/aws-dynamodb-icon-454x512-53ebjxww.png',
    },
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    type: 'CustomNode',
    data: {
      label: 'AWS S3',
      icon: 'https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-423x512-sofvbo3x.png',
    },
  },
  {
    id: '3',
    position: { x: 0, y: 10 },
    type: 'TextNode',
    data: {
      label: '',
      icon: '',
    },
  },
]
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }]

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [fontSize, setFontSize] = useState<number>(16)

  const handleFontSizeChange = (increment: number) => {
    setFontSize((prevSize) => prevSize + increment)
  }

  const handleIconSelection = (value: string) => {
    const icon = `/Users/hassanmohiuddin/fluffy-octo-enigma/client/src/components/images/${value}.png`
    if (value !== '') {
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: 'CustomNode',
        position: { x: 0, y: 0 },
        data: {
          label: value,
          icon: `/Users/hassanmohiuddin/fluffy-octo-enigma/client/src/components/images/loadbalancer.png`,
        },
      }
      setNodes((prevNodes) => [...prevNodes, newNode])
    }
  }

  const handleShapeSelection = (value: string) => {
    if (value !== '') {
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: '', icon: '' },
      }
      setNodes((prevNodes) => [...prevNodes, newNode])
    }
  }

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: 'black' },
    type: 'floating',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black',
    },
  }

  return (
    <Box height='100%' flex='1'>
      <Box width='100%' height='100%' position='relative'>
        <Box position='absolute' width='100%' top='0' left='0' zIndex='99'>
          <Toolbar numNodes={nodes.length} setNodes={setNodes} />
        </Box>
        <Box width='100%' height='100%'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            style={{ fontSize: `${fontSize}px` }}
          >
            <MiniMap
              style={{
                height: 120,
              }}
              zoomable
              pannable
            />
            <Controls />
            <Background color='#757575' gap={16} />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  )
}

export default Canvas
