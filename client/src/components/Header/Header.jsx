// React
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// Material UI
import {
  AppBar,
  IconButton,
  List,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Home, Add } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
// File Modules
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import TheSnackbar from "../Snackbar/TheSnackbar";
import AccountDialog from "../AccountDialog/AccountDialog";

const useStyles = makeStyles({
  toolbar: {
    display: `flex`,
    justifyContent: `space-between`,
    backgroundColor: "#161616",
  },
  linkText: {
    textDecoration: `none`,
    display: `inline-block`,
    textTransform: `uppercase`,
    color: `white`,
  },
  menuLink: {
    textDecoration: `none`,
    color: "black",
  },
  iconRoot: {
    paddingTop: "2px",
  },
  imageIcon: {
    marginTop: "2px",
    height: "40px",
  },
});

const Header = ({ theme, setTheme }) => {
  const classes = useStyles();
  // Using AuthContextAPI to get the setJwt function
  const { jwt } = useContext(AuthContext);
  const history = useHistory();

  const changeMode = () => {
    !theme ? setTheme(true) : setTheme(false);
  };

  //Account menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //Dialog
  const [open, setOpen] = useState(false);

  const handleAlertOpen = () => {
    handleMenuClose();
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  //Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
    console.log("snackbar!");
  };

  // const handleSnackbarClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSnackbarOpen(false);
  // };

  //Fullscreen dialog
  const [openFSDialog, setOpenFSDialog] = useState(false);

  const handleFSDialogOpen = () => {
    handleMenuClose();
    setOpenFSDialog(true);
  };

  const handleFSDialogClose = () => {
    setOpenFSDialog(false);
  };

  //Delete user function

  const deleteUser = () => {
    handleAlertClose();
    handleFSDialogClose();
    handleSnackbarOpen();
    history.push("/login");
    API.deleteUser(jwt)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/home" classes={classes.iconRoot}>
            {/* <Typography variant="h6" className={classes.linkText}>
              Ciphr
            </Typography> */}
            <img
              src="/img/cipher_navlogo.svg"
              alt="logo"
              classes={classes.imageIcon}
            />
          </Link>

          <List component="nav" aria-labelledby="main navigation">
            {jwt ? (
              <Link to="/home">
                <IconButton
                  edge="end"
                  className={classes.linkText}
                  aria-label="home"
                >
                  <Home fontSize="default" />
                </IconButton>
              </Link>
            ) : (
              ""
            )}
            {jwt ? (
              <Link to="/algorithms/new">
                <IconButton
                  edge="end"
                  className={classes.linkText}
                  aria-label="add"
                >
                  <Add fontSize="default" />
                </IconButton>
              </Link>
            ) : (
              ""
            )}
            <Tooltip title="Toggle Light/Dark Theme">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode"
                onClick={changeMode}
              >
                {theme ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {jwt ? (
              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  aria-label="account"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleFSDialogOpen}>My Account</MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to={"/login"}
              >
                Logout
              </MenuItem>
            </Menu>
          </List>
        </Toolbar>
      </AppBar>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        dialogTitle="Delete Account?"
        dialogContent="This action can't be undone... and you'll probably lose some good friends. Knowing that, would you still like to delete your Ciphr account?"
        btn1="Cancel"
        btn2="Delete"
        btnColor="secondary"
        deleteUser={deleteUser}
      />
      <TheSnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        message="Your account has been deleted"
      />
      <AccountDialog
        openFSDialog={openFSDialog}
        setOpenFSDialog={setOpenFSDialog}
        handleAlertOpen={handleAlertOpen}
      />
    </>
  );
};
export default Header;
