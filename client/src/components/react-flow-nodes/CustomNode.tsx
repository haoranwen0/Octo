import { memo } from "react";
import { Handle, Position } from "reactflow";
import { GenericService } from "../../interfaces/custom-node";
import { Container, Box, Typography } from "@mui/material";

interface CustomNodeProps {
  data: GenericService;
}

function CustomNode(props: CustomNodeProps) {
  const data = props.data;

  return (
    <Container
      component="div"
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
      <Box component="div" className="flex items-center">
        <Box component="div" className="rounded-full grid place-content-center">
          <Box
            component="img"
            src={data.icon}
            className="w-12 h-12 object-contain mr-2"
          />
        </Box>
        <Typography variant="body1">{data.label}</Typography>
      </Box>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500 h-4"
      />
    </Container>
  );
}

export default memo(CustomNode);
