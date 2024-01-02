import React, { useState } from 'react'

import { Box } from '@mui/material'
import ReactFlow, { MiniMap, Background, Controls, MarkerType } from 'reactflow'

import useDiagramCanvas from '../../../hooks/useDiagramCanvas'
import CustomNode from '../../react-flow-nodes/CustomeNode'
import TextNode from '../../react-flow-nodes/TextNode'
import Toolbar from '../Toolbar'
import 'reactflow/dist/style.css'

const nodeTypes = {
  CustomNode: CustomNode,
  TextNode: TextNode
}

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'default',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black'
  }
}

const Canvas: React.FC = () => {
  const canvas = useDiagramCanvas()
  const [fontSize, setFontSize] = useState<number>(16)

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
            style={{ fontSize: `${fontSize}px` }}
          >
            <MiniMap
              style={{
                height: 120
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
