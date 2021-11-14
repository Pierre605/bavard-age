import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";

function Copyright() {
  return (
    <>
      {"Bavard'Âge © "}
      <Link href='/'>BioWoMen</Link> {new Date().getFullYear()}
    </>
  );
}
const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

export default function Footer() {
  return (
    <Typography
      component='footer'
      sx={{ display: "flex", bgcolor: "grey.300" }}>
      <Container
        sx={{ my: 2, display: "flex", justifyContent: "center", gap: "3rem" }}>
        <Copyright />

        <Typography variant='h6' marked='left' gutterBottom>
          Legal
        </Typography>
        <Box component='ul' sx={{ m: 0, listStyle: "none", p: 0 }}>
          <Box component='li' sx={{ py: 0.5 }}>
            <Link href='/premium-themes/onepirate/terms/'>Terms</Link>
          </Box>
          <Box component='li' sx={{ py: 0.5 }}>
            <Link href='/premium-themes/onepirate/privacy/'>Privacy</Link>
          </Box>
        </Box>
      </Container>
    </Typography>
  );
}
