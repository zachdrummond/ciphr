import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Home from "./containers/Home/Home";
import Challenge from "./containers/Challenge/Challenge";
import EditAlgorithm from "./containers/EditAlgorithm/EditAlgorithm";
import AddAlgorithm from "./containers/AddAlgorithm/AddAlgorithm";
import NotFound from "./containers/NotFound/NotFound";
import Header from "./components/Header";

// start of figuring out dark/light mode

// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  // start of figuring out dark/light mode

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // // const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? "dark" : "light",
  //       },
  //     }),
  //   [prefersDarkMode]
  // );
  return (
    // start of figuring out dark/light mode

    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/algorithms/new" component={AddAlgorithm} />
            <Route
              exact
              path="/algorithms/:algorithmId/edit"
              component={EditAlgorithm}
            />
            <Route
              exact
              path="/algorithms/:algorithmId"
              component={Challenge}
            />
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Login} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Router>
      </div>
    // </ThemeProvider>
  );
}

export default App;
