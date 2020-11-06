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
import Switch from '@material-ui/core/Switch';

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
});

const navLinks = [
  { title: `home`, path: `/home` },
  { title: `Add Algorithm`, path: `/algorithms/new` },
  { title: `Logout`, path: `/` },
];

const Header = () => {
  const classes = useStyles();
  const [mode, setMode] = React.useState(true);

  const handleChange = (event) => {
    setMode(event.target.checked);
  };

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
          </List>
          <FormGroup className={classes.linkText}>
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
          </FormGroup>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
