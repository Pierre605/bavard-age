import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Register from "../register/Register";
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
    height: "auto",
    borderRadius: 25,
    backgroundColor: `rgba(79, 54, 70, 1.5)`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
  },
}));

export default function RegisterModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    // e.preventDefault();
    // console.log(e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: "3rem",
          position: "relative",
        }}>
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
          aria-labelledby='Fenêtre pour créer un compte'
          aria-describedby='Modal de création de compte'>
          <div style={modalStyle} className={classes.paper}>
            <Register
              close={handleClose}
            />
          </div>
        </Modal>
      </Container>
    </>
  );
}
