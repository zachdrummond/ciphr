// React
import React from "react";
import { useContext } from "react";
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
import AuthContext from "../../context/AuthContext/AuthContext";
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
  // Using AuthContextAPI to get the setJwt function
  const { jwt } = useContext(AuthContext);

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

  //Dialog state

  const [open, setOpen] = React.useState(false);

  //Delete account dialog

  const handleAlertOpen = () => {
    handleMenuClose();
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

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
                // onClick={handleMenuClose}
                onClick={handleAlertOpen}
                style={{ color: "red" }}
              >
                Delete account
              </MenuItem>
            </Menu>
            {/* <Avatar>H</Avatar> */}
          </List>
        </Toolbar>
      </AppBar>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        headline="Delete Account?"
        description="This action can't be undone... and you'll probably lose some friends. Knowing that, you would you like to delete your Ciphr account?"
      />
    </>
  );
};
export default Header;
