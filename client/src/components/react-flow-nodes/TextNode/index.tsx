import React, { useState, memo } from "react";
import { GenericService } from "../../../interfaces";

interface CustomNodeProps {
  data: GenericService;
}

function TextNode(props: CustomNodeProps) {
  const [label, setLabel] = useState(props.data.label || "Write here");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "100px",
        padding: "10px",
        border: "1px solid #ddd",
      }}
    >
      <input
        type="text"
        value={label}
        onChange={handleTextChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
    </div>
  );
}

export default memo(TextNode);
