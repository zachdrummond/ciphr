import React from "react";
// import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

const navLinks = [
  { title: `home`, path: `/home` },
  { title: `Logout`, path: `/` },
  { title: `Add Algorithm`, path: `/algorithms/new` },
];

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>
        <List component="nav" aria-labelledby="main navigation">
          {navLinks.map(({ title, path }) => (
            <a href={path} key={title}>
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
            </a>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
