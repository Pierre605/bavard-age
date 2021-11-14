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
    height: "90%",
    borderRadius: 25,
    // backgroundColor: `#4f3646`,
    // backgroundColor: theme.palette.background.paper,
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
            <Register
              close={handleClose}
              checked={checked}
              onChange={onChange}
            />
          </div>
        </Modal>
      </Container>
    </>
  );
}
