import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
// Composants enfants
// import NavBar from "../navBar/NavBar";

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='title'>
          <a href='/'>
            <img src='/logo2.png' width='5%' alt='logo-provisoire' />
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
