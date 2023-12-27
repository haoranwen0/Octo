import { useCallback } from "react";
import { Box, Input, InputAdornment } from "@mui/material";
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
  EdgeProps,
  Edge,
} from "reactflow";
import CustomNode from "../react-flow-nodes/CustomeNode";
import TextNode from "../react-flow-nodes/TextNode";
import { useState, useRef } from "react";

import "reactflow/dist/style.css";

const nodeTypes = {
  CustomNode: CustomNode,
  TextNode: TextNode,
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
  {
    id: "3",
    position: { x: 0, y: 10 },
    type: "TextNode",
    data: {
      label: "",
      icon: "",
    },
  },
];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }]

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fontSize, setFontSize] = useState<number>(16); // Initial font size
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [selectedFontType, setSelectedFontType] = useState<string>("");

  const handleFontSizeChange = (increment: number) => {
    setFontSize((prevSize) => prevSize + increment);
  };

  const handleIconSelection = (value: string) => {
    setSelectedIcon(value);
    const icon = `/Users/hassanmohiuddin/fluffy-octo-enigma/client/src/components/images/${value}.png`;
    console.log(icon);
    if (value !== "") {
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: "CustomNode",
        position: { x: 0, y: 0 },
        data: {
          label: value,
          icon: `/Users/hassanmohiuddin/fluffy-octo-enigma/client/src/components/images/loadbalancer.png`,
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    }
  };

  const handleShapeSelection = (value: string) => {
    setSelectedShape(value);
    if (value !== "") {
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: "default",
        position: { x: 0, y: 0 },
        data: { label: "", icon: "" },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    }
  };

  const handleFontTypeSelection = (value: string) => {
    setSelectedFontType(value);
  };

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: "black" },
    type: "floating",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "black",
    },
  };

  return (
    <Box height="100%" flex="1">
      <Box className="bg-slate-50 w-full h-full rounded-lg">
        <Box className="w-full h-full">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {/* Dropdown for node selection */}
            <select
              value={selectedIcon}
              onChange={(e) => handleIconSelection(e.target.value)}
              style={{
                backgroundColor: "black",
                color: "white",
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
            </select>

            {/* Dropdown for shape selection */}
            <select
              value={selectedShape}
              onChange={(e) => handleShapeSelection(e.target.value)}
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
            </select>

            {/* Dropdown for font type selection */}
            <select
              value={selectedFontType}
              onChange={(e) => handleFontTypeSelection(e.target.value)}
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
            </select>

            {/* Font displayer with +/- buttons */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => handleFontSizeChange(1)}>+</button>
              <div style={{ margin: "0 8px" }}>Font Size: {fontSize}</div>
              <button onClick={() => handleFontSizeChange(-1)}>-</button>
            </div>
          </div>
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
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Box>
      </Box>
    </Box>
  );
};

export default Diagram;
