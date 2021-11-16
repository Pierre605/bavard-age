import Logout from "../logout/Logout";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function HeaderLogout(props) {
  let a = `/${props.user}/conversation-list`;

  return (
    <Box
      component='header'
      position='sticky'
      fullwidth
      sx={{
        mt: "0.2rem",
        backgroundColor: (theme) => theme.palette.common.white,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mx: "1.6rem",
      }}>
      <Box>
        <a id='home' href={a}>
          <img
            src='/logoblanc.png'
            edge='start'
            width='100px'
            alt='Retour à votre page'
          />
        </a>
      </Box>
      <Typography variant='h4' sx={{ textAlign: "center" }}>
        {props.userName ? "Bienvenue " + props.userName + " !" : ""}
      </Typography>
      <Logout user={props.user} />
    </Box>
  );
}
