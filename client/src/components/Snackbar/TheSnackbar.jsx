import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const TheSnackbar = ({ snackbarOpen, setSnackbarOpen, message }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default TheSnackbar;
