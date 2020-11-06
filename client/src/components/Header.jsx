import React from "react";
// import * as React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

const navlinks = [
  { title: `home`, path: `/home` },
  { title: `Logout`, path: `/` },
  { title: `Add Algorithm`, path: `/algorithms/new` },
];

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar></Toolbar>
    </AppBar>
  );
};
export default Header;
