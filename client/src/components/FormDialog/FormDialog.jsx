import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TheSnackbar from "../Snackbar/TheSnackbar";

const FormDialog = ({
  openFormDialog,
  setOpenFormDialog,
  title,
  content,
  label,
  btn1,
  btn2,
}) => {
  const hideForm = () => {
    setOpenFormDialog(false);
  };

  //Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
    console.log("snackbar!");
  };

  const pwUpdated = () => {
    handleSnackbarOpen();
    hideForm();
  };

  return (
    <div>
      <Dialog
        open={openFormDialog}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            {btn1}
          </Button>
          <Button onClick={pwUpdated} color="primary">
            {btn2}
          </Button>
        </DialogActions>
      </Dialog>
      <TheSnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        message="Your password has been updated"
      />
    </div>
  );
};

export default FormDialog;
