import React from "react";
import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import AuthContext from "../../context/AuthContext/AuthContext";
import FormDialog from "../FormDialog/FormDialog";

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
  const { username, password } = useContext(AuthContext);

  const classes = useStyles();

  const handleClose = () => {
    setOpenFSDialog(false);
  };

  //Form Dialog
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const showForm = () => {
    setOpenFormDialog(true);
  };

  // const hideForm = () => {
  //   setOpenFormDialog(false);
  // };

  return (
    <div>
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Username" secondary={username} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Password" secondary="********" />
            <Tooltip
              title="Update password"
              aria-label="update"
              placement="left"
            >
              <IconButton
                // component={Link}
                // to={`/algorithms/edit/${id}`}
                onClick={showForm}
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
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        title="Update Password"
        content="Enter your old password first. Then enter a new password."
        label1="Old Password"
        label2="New Password"
        btn1="Cancel"
        btn2="Save"
      />
    </div>
  );
};

export default AccountDialog;
