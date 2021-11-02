import { createTheme } from "@mui/material/styles";
import Luciole from "./fonts/Luciole-Regular.ttf";
import { green } from "@mui/material/colors";
// /* Le caractère typographique Luciole a été conçu spécifiquement pour les personnes malvoyantes. Ce projet est le résultat de plus de deux années de collaboration entre le Centre Technique Régional pour la Déficience Visuelle et le studio typographies.fr. Le projet a bénéficié d'une bourse de la Fondation suisse Ceres et de l'appui du laboratoire DIPHE de l'Université Lumière Lyon 2. luciole-vision.com */
const theme = createTheme({
  typography: {
    fontFamily:
      "Luciole, Arial, Roboto, Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
  palette: {
    primary: { main: "#259185" },
    secondary: {
      main: green[300],
      dark: green[900],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Luciole';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Luciole'), local('Luciole-Regular'), url(${Luciole}) format('ttf');
        }
      `,
    },
  },
});
export default theme;
