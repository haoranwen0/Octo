import { Avatar, Stack } from "@mui/material"
import { red, deepPurple, grey } from "@mui/material/colors"

import { stringAvatar } from "../../utils"

const Navbar = () => {
  return (
    <Stack
      padding="0.5rem"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor={grey[200]}
      direction="row"
    >
      <Avatar
        sx={{
          width: "2rem",
          height: "2rem",
          backgroundColor: red[400],
        }}
      >
        O
      </Avatar>
      <Avatar
        {...stringAvatar("Haoran Wen")}
        sx={{
          width: "2rem",
          height: "2rem",
          fontSize: "0.875rem",
          backgroundColor: deepPurple[400],
        }}
      />
    </Stack>
  )
}

export default Navbar
