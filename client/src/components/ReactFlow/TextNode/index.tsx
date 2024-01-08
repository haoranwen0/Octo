import React, { useState, memo, type ChangeEvent } from "react";

import { TextField } from "@mui/material";
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

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLabel(event.target.value);
  };

  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} />
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={label}
        onChange={handleTextChange}
      />
    </>
    // <div
    //   style={{
    //     position: 'relative',
    //     width: '200px',
    //     height: '100px',
    //     padding: '10px',
    //     border: '1px solid #ddd'
    //   }}
    // >
    //   <input
    //     type='text'
    //     value={label}
    //     onChange={handleTextChange}
    //     style={{ width: '100%', marginBottom: '10px' }}
    //   />
    // </div>
  );
};

export default memo(TextNode);
