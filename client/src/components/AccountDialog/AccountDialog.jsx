// React
import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import FormDialog from "../FormDialog/FormDialog";
import TheSnackbar from "../Snackbar/TheSnackbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountDialog = ({ openFSDialog, setOpenFSDialog, handleAlertOpen }) => {
  const classes = useStyles();
  const history = useHistory();

  const { username, jwt } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  //Form Dialog
  const [openFormDialog, setOpenFormDialog] = useState({
    open: false,
    title: "",
    content: "",
    label: "",
    message: "",
  });
  // form error state
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  //Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    hideForm();
    setSnackbarOpen(true);
  };

  const hideForm = () => {
    setOpenFormDialog(false);
  };

  const handleClose = () => {
    setOpenFSDialog(false);
  };

  // update password
  const handleInput = (event) => {
    setUserInfo(event.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    if (userInfo) {
      API.editUser(jwt, openFormDialog.title, userInfo)
        .then((user) => {
          handleClose();
          setUserInfo("");
          if (openFormDialog.title === "Update Username") {
            history.push("/login");
          }
          handleSnackbarOpen();
        })
        .catch((err) => {
          console.log(error);
          setError({
            error: true,
            message: "Username already exists.",
          });
        });
    } else {
      setError({
        error: true,
        message: "This field is required.",
      });
    }
  };

  const showForm = (id) => {
    if (id === "updatePassword") {
      setOpenFormDialog({
        open: true,
        title: "Update Password",
        content: "Enter a new password:",
        label: "New Password",
      });
    } else if (id === "updateUsername") {
      setOpenFormDialog({
        open: true,
        title: "Update Username",
        content: "Enter a new username:",
        label: "New Username",
      });
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openFSDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Account Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="Username" secondary={username} />
            <Tooltip
              title="Update Username"
              aria-label="update"
              placement="left"
            >
              <IconButton
                onClick={() => showForm("updateUsername")}
                edge="end"
                aria-label="edit"
              >
                <EditIcon name="updateUsername" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Password" secondary="***********" />
            <Tooltip
              title="Update Password"
              aria-label="update"
              placement="left"
            >
              <IconButton
                onClick={() => showForm("updatePassword")}
                edge="end"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItem>
            <Button onClick={handleAlertOpen} color="secondary">
              Delete Account
            </Button>
          </ListItem>
        </List>
      </Dialog>
      <FormDialog
        openFormDialog={openFormDialog.open}
        setOpenFormDialog={setOpenFormDialog}
        handleSubmit={handleSubmit}
        hideForm={hideForm}
        title={openFormDialog.title}
        content={openFormDialog.content}
        label={openFormDialog.label}
        value={userInfo}
        handleInput={handleInput}
        btn1="Cancel"
        btn2="Save"
        error={error.error}
        helperText={error.error ? error.message : ""}
      />
      <TheSnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        message="Your user information has been updated."
      />
    </>
  );
};

export default AccountDialog;
