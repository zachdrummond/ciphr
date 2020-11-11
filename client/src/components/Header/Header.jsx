import React from "react";
import { Link } from "react-router-dom";
// import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    display: `inline-block`,
    textTransform: `uppercase`,
    color: `white`,
  },
  left: {
    float: `left`,
  },
});

const navLinks = [
  { title: `home`, path: `/home` },
  { title: `Add Algorithm`, path: `/algorithms/new` },
  //   { title: `Logout`, path: `/` },
];

const Header = ({ theme, setTheme }) => {
  const classes = useStyles();
  // const [mode, setMode] = React.useState(true);

  // const [theme, setTheme] = React.useState(true);
  // const icon = !theme ? <Brightness7Icon /> : <Brightness4Icon />;

  const changeMode = () => {
    if (!theme) {
      setTheme(theme);
    } else if (theme) {
      setTheme(!theme);
    }
  };

  // const handleChange = (event) => {
  //   setMode(event.target.checked);
  // };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>

          <List component="nav" aria-labelledby="main navigation">
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
            {/* <FormGroup className={classes.linkText}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                }
                label={mode ? "Light" : "Dark"}
              />
            </FormGroup> */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={changeMode}
            >
              {!theme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
