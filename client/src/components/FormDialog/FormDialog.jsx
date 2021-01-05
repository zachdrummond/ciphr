// Material UI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

const FormDialog = ({
  openFormDialog,
  hideForm,
  title,
  content,
  label,
  btn1,
  btn2,
  handleSubmit,
  handleInput,
  error,
  helperText
}) => {

  return (
    <>
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
            label={label}
            type="text"
            fullWidth
            onChange={handleInput}
            error={error}
            helperText={helperText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            {btn1}
          </Button>
          <Button onClick={()=>{handleSubmit()}} color="primary">
            {btn2}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
