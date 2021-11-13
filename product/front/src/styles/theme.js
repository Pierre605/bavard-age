import { createTheme } from "@mui/material/styles";
// import Luciole from "./fonts/Luciole-Regular.ttf";
import { green } from "@mui/material/colors";
// import Image from "../styles/assets/famille.jpg";
// /* Le caractère typographique Luciole a été conçu spécifiquement pour les personnes malvoyantes. Ce projet est le résultat de plus de deux années de collaboration entre le Centre Technique Régional pour la Déficience Visuelle et le studio typographies.fr. Le projet a bénéficié d'une bourse de la Fondation suisse Ceres et de l'appui du laboratoire DIPHE de l'Université Lumière Lyon 2. luciole-vision.com */
const theme = createTheme({
  typography: {
    fontFamily: [
      "Luciole",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Open Sans"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    //   fontSize: 20,
    //   htmlFontSize: 18,
    letterSpacing: 10,
    button: {
      letterSpacing: 4,
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
      // light: "#a0929b",
      // light: "rgba(79, 54, 70, 0.54)",
      light: "rgba(79, 54, 70, 0.54)",
      main: "#4f3646",
      dark: "#372631",
      // contrastText: "#98Ac37",
      contrastText: "#fff",
    },
    secondary: {
      main: "#98Ac37",
      light: green[300],
      dark: "#7a8a2c",
      // contrastText: "#4f3646",
      contrastText: "#fff",
    },
    text: {
      primary: "#2f202a",
      secondary: "#4f3646",
    },
  },
  // overrides: {
  //   MuiInputLabel: {
  //     root: {
  //       color: green[300],
  //       fontSize: 32,
  //     },
  //   },

  // background: {
  //   paper: `url(${Image})`,
  // },
  // },
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
