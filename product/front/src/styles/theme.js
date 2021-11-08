import { createTheme } from "@mui/material/styles";
// import Luciole from "./fonts/Luciole-Regular.ttf";
import { green } from "@mui/material/colors";
import Image from "../assets/famille.jpg";
// /* Le caractère typographique Luciole a été conçu spécifiquement pour les personnes malvoyantes. Ce projet est le résultat de plus de deux années de collaboration entre le Centre Technique Régional pour la Déficience Visuelle et le studio typographies.fr. Le projet a bénéficié d'une bourse de la Fondation suisse Ceres et de l'appui du laboratoire DIPHE de l'Université Lumière Lyon 2. luciole-vision.com */
const theme = createTheme({
  typography: {
    fontFamily: [
      "Luciole",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Open Sans",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 20,
    htmlFontSize: 18,

    button: {
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
      light: "#7b2cbf",
      main: "#3c096c",
      dark: "#240046",
      contrastText: "#98Ac37",
    },
    secondary: {
      main: "#98Ac37",
      light: green[300],
      dark: green[900],
      contrastText: "#3c096c",
    },
    text: {
      primary: "#240046",
    },
    background: {
      paper: `url(${Image})`,
    },
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       @font-face {
  //         font-family: 'Luciole';
  //         font-style: normal;
  //         font-display: swap;
  //         font-weight: 400;
  //         src: local('Luciole'), local('Luciole-Regular'), url(${Luciole}) format('ttf');
  //       }
  //     `,
  //   },
  // },
});
export default theme;
