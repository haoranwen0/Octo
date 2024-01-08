import React, { useState } from "react";

import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import ReactFlow, {
  MiniMap,
  Background,
  Controls,
  MarkerType,
  ConnectionMode,
  type ReactFlowInstance,
} from "reactflow";

import { parseJSONToGraph } from "../../../functions";
import getLayoutedElements from "../../../functions/dagreGraph";
import useDiagramCanvas from "../../../hooks/useDiagramCanvas";
import CustomNode from "../../ReactFlow/ComponentNode";
import ShapeNode from "../../ReactFlow/ShapeNode";
import TextNode from "../../ReactFlow/TextNode";
import Toolbar from "../Toolbar";

import "reactflow/dist/style.css";

const nodeTypes = {
  CustomNode,
  TextNode,
  ShapeNode,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: grey[400] },
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: grey[400],
  },
};

const Canvas: React.FC = () => {
  const [canvasRef, setCanvasRef] = useState<ReactFlowInstance | null>(null);

  const canvas = useDiagramCanvas({ canvasRef });
  console.log(canvas.nodes);
  console.log(canvas.edges);

  return (
    <Box height="100%" flex="1">
      <Box width="100%" height="100%" position="relative">
        <Box position='absolute' width='100%' top='0' left='0' zIndex='99'>
          <Toolbar numNodes={canvas.nodes.length} setNodes={canvas.setNodes} />
        </Box>
        <Box width="100%" height="100%">
          <ReactFlow
            nodes={canvas.nodes}
            edges={canvas.edges}
            onNodesChange={canvas.onNodesChange}
            onEdgesChange={canvas.onEdgesChange}
            onConnect={canvas.onConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onInit={(instance) => {
              setCanvasRef(instance);
            }}
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
            <Background color="#757575" gap={16} />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
};

export default Canvas;
