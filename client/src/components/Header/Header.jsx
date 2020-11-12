// React
import React from "react";
import { Link } from "react-router-dom";
// Material UI
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
// File Modules
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AlertDialog from "../../components/AlertDialog/AlertDialog";

const useStyles = makeStyles({
  toolbar: {
    display: `flex`,
    justifyContent: `space-between`,
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
});

const navLinks = [
  { title: `Add Algorithm`, path: `/algorithms/new` },
  { title: `Logout`, path: `/login` },
];

const Header = ({ theme, setTheme }) => {
  const classes = useStyles();

  const changeMode = () => {
    !theme ? setTheme(true) : setTheme(false);
  };

  //Account menu

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //Delete dialog state

  const [open, setOpen] = React.useState(false);

  //Delete dialog

  const handleAlertOpen = () => {
    handleMenuClose();
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  //Delete user function

  // const deleteUser = () => {
  //   API.deleteUser(id)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/home">
            <IconButton
              edge="start"
              className={classes.linkText}
              aria-label="home"
            >
              <Home fontSize="large" />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.linkText}>
            AlgoMaster
          </Typography>

          <List component="nav" aria-labelledby="main navigation">
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}

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

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose} to="/login">
                <Link to="/login" className={classes.menuLink}>
                  Logout
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleAlertOpen}
                style={{ color: "red" }}
              >
                Delete account
              </MenuItem>
            </Menu>
          </List>
        </Toolbar>
      </AppBar>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        dialogTitle="Delete Account?"
        dialogContent="This action can't be undone... and you'll probably lose some friends. Knowing that, you would you still like to delete your Ciphr account?"
        btn1="Cancel"
        btn2="Delete"
        btnColor="secondary"
      />
    </>
  );
};
export default Header;
