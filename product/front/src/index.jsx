import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
// provides our theme
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.js";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
