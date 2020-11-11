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
  Tooltip
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

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
});

const navLinks = [
  { title: `home`, path: `/home` },
  { title: `Add Algorithm`, path: `/algorithms/new` },
  { title: `Logout`, path: `/` },
];

const Header = ({ theme, setTheme }) => {
  const classes = useStyles();
  // const [mode, setMode] = React.useState(true);

  const changeMode = () => {
    !theme ? setTheme(true) : setTheme(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>

        {/* <Typography variant="h6" className={classes.linkText}>
          AlgoMaster
        </Typography> */}

        <List component="nav" aria-labelledby="main navigation">
          {navLinks.map(({ title, path }) => (
            <Link to={path} key={title} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          ))}
          <Tooltip title="Toggle Light/Dark Theme" placement="bottom-end">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={changeMode}
            >
              {theme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </List>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
