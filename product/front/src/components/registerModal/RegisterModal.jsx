import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Register from "../register/Register";
import "./RegisterModal.css";
// import { red } from "@mui/material/colors";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    maxHeight: "90%",
    borderRadius: 25,
    // backgroundColor: `#000`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function RegisterModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: "3rem",
        }}>
        {/* <Typography
          sx={{ letterSpacing: 1.2, mb: "1.8rem", fontWeight: "700" }}
          variant='h4'
          component='h2'
          color='primary'>
          Pas encore inscrit ?
        </Typography> */}
        <Button
          sx={{
            lineHeight: 3,
            fontSize: "1.6rem",
            width: "24rem",
            alignSelf: "center",
            // mb: "2rem",
          }}
          type='button'
          size='large'
          variant='contained'
          onClick={handleOpen}>
          Créer un compte
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'>
          <div style={modalStyle} className={classes.paper}>
            <Register close={handleClose} />
          </div>
        </Modal>
      </Container>
    </>
  );
}
