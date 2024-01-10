import React, { useState, memo, type ChangeEvent } from "react";

import { Box, TextField } from "@mui/material";
import { NodeResizer, type NodeProps } from "reactflow";

import type { NodeData } from "../../../interfaces";

interface CustomNodeProps {
  data: NodeData;
}

const TextNode: React.FC<NodeProps<NodeData>> = (props) => {
  const selected = props.selected;

  const [label, setLabel] = useState(
    props.data.label !== "" ? props.data.label : "Write here"
  );

  const [editing, setEditing] = useState<boolean>(false);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLabel(event.target.value);
  };

  return (
    <Box
      width="100%"
      height="100%"
      sx={{ cursor: editing ? "default" : "move" }}
    >
      <NodeResizer color="#ff0071" isVisible={selected && !editing} />
      <TextField
        id="outlined-multiline-flexible"
        value={label}
        onChange={handleTextChange}
        sx={{ width: "100%", height: "100%" }}
        onBlur={() => {
          console.log("blurring");
          setEditing(false);
        }}
        onFocus={() => {
          console.log("focusing");
          setEditing(true);
        }}
      />
    </Box>
  );
};

export default memo(TextNode);
