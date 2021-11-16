import createTheme from "@mui/material/styles/createTheme";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import { green } from "@mui/material/colors";
// /* Le caractère typographique Luciole a été conçu spécifiquement pour les personnes malvoyantes. Ce projet est le résultat de plus de deux années de collaboration entre le Centre Technique Régional pour la Déficience Visuelle et le studio typographies.fr. Le projet a bénéficié d'une bourse de la Fondation suisse Ceres et de l'appui du laboratoire DIPHE de l'Université Lumière Lyon 2. luciole-vision.com */
let theme = createTheme({
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
    letterSpacing: 10,
    button: {
      letterSpacing: 4,
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
      light: "rgba(79, 54, 70, 0.54)",
      main: "#4f3646",
      dark: "#372631",
      contrastText: "#fff",
    },
    secondary: {
      main: "#98Ac37",
      light: green[300],
      dark: "#7a8a2c",
      contrastText: "#fff",
    },
    grey: {
      300: "rgba(196,196,196, 0.5)",
    },
    text: {
      primary: "#2f202a",
      secondary: "#4f3646",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
