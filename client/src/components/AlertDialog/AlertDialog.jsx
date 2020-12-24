import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const AlertDialog = ({
  open,
  setOpen,
  dialogTitle,
  dialogContent,
  btn1,
  btn2,
  btnColor,
  deleteUser,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {btn1}
        </Button>
        <Button onClick={deleteUser} color={btnColor} autoFocus>
          {btn2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
