import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ReactFlow, {
  MiniMap,
  Background,
  Controls,
  MarkerType,
  ReactFlowInstance,
  ConnectionMode,
} from 'reactflow'

import useDiagramCanvas from '../../../hooks/useDiagramCanvas'
import CustomNode from '../../ReactFlow/ComponentNode'
import TextNode from '../../ReactFlow/TextNode'
import ShapeNode from '../../ReactFlow/ShapeNode'
import Toolbar from '../Toolbar'

import 'reactflow/dist/style.css'

const nodeTypes = {
  CustomNode,
  TextNode,
  ShapeNode,
}

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
}

const Canvas = () => {
  const [canvasRef, setCanvasRef] = useState<ReactFlowInstance | null>(null)

  const canvas = useDiagramCanvas({ canvasRef })

  return (
    <Box height='100%' flex='1'>
      <Box width='100%' height='100%' position='relative'>
        <Box position='absolute' width='100%' top='0' left='0' zIndex='99'>
          <Toolbar numNodes={canvas.nodes.length} setNodes={canvas.setNodes} />
        </Box>
        <Box width='100%' height='100%'>
          <ReactFlow
            nodes={canvas.nodes}
            edges={canvas.edges}
            onNodesChange={canvas.onNodesChange}
            onEdgesChange={canvas.onEdgesChange}
            onConnect={canvas.onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onInit={(instance) => setCanvasRef(instance)}
            connectionMode={ConnectionMode.Loose}
            fitView
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
