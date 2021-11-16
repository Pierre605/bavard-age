import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function HeaderHomePage() {
  return (
    <Box
      component='header'
      position='sticky'
      fullwidth
      sx={{
        mt: "2rem",
        backgroundColor: (theme) => theme.palette.common.white,
      }}>
      <Toolbar>
        <img
          edge='start'
          src='/logotxt.png'
          width='310'
          alt='logo BavardAge'
          // style={{ marginLeft: "2.4rem" }}
        />
      </Toolbar>
    </Box>
  );
}
