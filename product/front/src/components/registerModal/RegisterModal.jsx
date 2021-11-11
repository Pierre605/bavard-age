import React from "react";
import { makeStyles } from "@mui/styles";
import { Modal, Typography, Button, Box } from "@mui/material";
import "./RegisterModal.css";
import Register from "../register/Register";

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
    borderRadius: 25,
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
    <Box>
      <Typography variant='h4' component='h2' color='primary'>
        Pas encore inscrit ?
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          padding: 20,
        }}>
        <Button
          fullWidth
          type='button'
          variant='contained'
          onClick={handleOpen}>
          Enregistrez-vous
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        <div style={modalStyle} className={classes.paper}>
          <Register close={handleClose} />
        </div>
      </Modal>
    </Box>
  );
}
