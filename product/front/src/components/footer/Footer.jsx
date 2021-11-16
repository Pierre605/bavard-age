import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

function Copyright() {
  return (
    <Typography>
      {"Bavard'Âge © "}
      <Link href='/'>BioWoMen</Link> {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Typography
        component='footer'
        sx={{
          display: "flex",
          bgcolor: "grey.300",
          position: "static",
          bottom: 0,
        }}>
        <Container
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
          }}>
          <Box>
            <Stack
              direction='row'
              justifyContent='center'
              spacing={4}
              sx={{ mb: 1 }}>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                href='https://duckduckgo.com/'
                target='_blank'
                rel='noopener noreferrer'>
                <Facebook fontSize='large' />
              </Link>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                href='https://duckduckgo.com/'
                target='_blank'
                rel='noopener noreferrer'>
                <Instagram fontSize='large' />
              </Link>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                href='https://duckduckgo.com/'
                target='_blank'
                rel='noopener noreferrer'>
                <Twitter fontSize='large' />
              </Link>
            </Stack>
            <Copyright />
          </Box>
          
        </Container>
      </Typography>
    </>
  );
}
