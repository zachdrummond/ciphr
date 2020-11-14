// React
import { useState } from "react";
// Material UI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
// File Modules
import TheSnackbar from "../Snackbar/TheSnackbar";

const FormDialog = ({
  openFormDialog,
  setOpenFormDialog,
  title,
  content,
  label,
  btn1,
  btn2,
  handleSubmit,
  handleInput,
}) => {

  //Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const hideForm = () => {
    setOpenFormDialog(false);
  };

  const updatePassword = () => {
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
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            {btn1}
          </Button>
          <Button onClick={()=>{handleSubmit(); updatePassword()}} color="primary">
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
