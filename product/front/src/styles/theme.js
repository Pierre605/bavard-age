import { createTheme } from "@mui/material/styles";
// import Luciole from "./fonts/Luciole-Regular.ttf";
import { green } from "@mui/material/colors";
<<<<<<< HEAD
// import Image from "../styles/assets/famille.jpg";
=======
import Image from "../assets/famille.jpg";
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
// /* Le caractère typographique Luciole a été conçu spécifiquement pour les personnes malvoyantes. Ce projet est le résultat de plus de deux années de collaboration entre le Centre Technique Régional pour la Déficience Visuelle et le studio typographies.fr. Le projet a bénéficié d'une bourse de la Fondation suisse Ceres et de l'appui du laboratoire DIPHE de l'Université Lumière Lyon 2. luciole-vision.com */
const theme = createTheme({
  typography: {
    fontFamily: [
      "Luciole",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
<<<<<<< HEAD
      '"Open Sans"',
=======
      "Open Sans",
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
<<<<<<< HEAD
    //   fontSize: 20,
    //   htmlFontSize: 18,
    letterSpacing: 10,
    button: {
      letterSpacing: 4,
=======
    fontSize: 20,
    htmlFontSize: 18,

    button: {
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
<<<<<<< HEAD
      light: "#a0929b",
      // light: "rgba(79, 54, 70, 0.54)",
      main: "#4f3646",
      dark: "#372631",
=======
      light: "#7b2cbf",
      main: "#3c096c",
      dark: "#240046",
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
      contrastText: "#98Ac37",
    },
    secondary: {
      main: "#98Ac37",
      light: green[300],
<<<<<<< HEAD
      dark: "#7a8a2c",
      contrastText: "#4f3646",
    },
    text: {
      primary: "#2f202a",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: green[300],
        fontSize: 32,
      },
=======
      dark: green[900],
      contrastText: "#3c096c",
    },
    text: {
      primary: "#240046",
    },
    background: {
      paper: `url(${Image})`,
>>>>>>> 6dd0aebe513f21653d3ee0f4c7e212056b42907a
    },

    // background: {
    //   paper: `url(${Image})`,
    // },
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
