import { useCallback } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  OnConnect,
  MiniMap,
  Background,
  Controls,
  Connection,
} from "reactflow";
import CustomNode from "./react-flow-nodes/CustomNode";

import "reactflow/dist/style.css";

const nodeTypes = {
  CustomNode: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "CustomNode",
    data: {
      label: "AWS DynamoDB",
      icon: "https://static-00.iconduck.com/assets.00/aws-dynamodb-icon-454x512-53ebjxww.png",
    },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    type: "CustomNode",
    data: {
      label: "AWS S3",
      icon: "https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-423x512-sofvbo3x.png",
    },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <Box className="flex-1 h-full py-4 pr-4">
      <Box className="bg-slate-50 w-full h-full rounded-lg">
        <Box className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <MiniMap
              style={{
                height: 120,
              }}
              zoomable
              pannable
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
};

export default Diagram;
