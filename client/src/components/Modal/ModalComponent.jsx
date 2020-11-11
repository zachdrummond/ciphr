import { useHistory } from "react-router-dom";
// Material UI
import { Backdrop, Fade, Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    justify: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalComponent = ({open, setOpen, text, url}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleModalClose = () => {
    setOpen(false);
    history.push({url});
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.modalPaper}>
          <h2 id="transition-modal-title">{text}</h2>
          <p align="center" id="transition-modal-description">Click anywhere to continue.</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
