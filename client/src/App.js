// React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// File Modules
import AddAlgorithm from "./containers/AddAlgorithm/AddAlgorithm";
import AuthContext from "./context/AuthContext/AuthContext";
import Challenge from "./containers/Challenge/Challenge";
import EditAlgorithm from "./containers/EditAlgorithm/EditAlgorithm";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./containers/SignUp/SignUp";
import NotFound from "./containers/NotFound/NotFound";
import setAxiosDefaults from "./utils/setAxiosDefaults";

// define dark/light themes

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

// import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const [jwt, setJwt] = useState("");
  const [username, setUsername] = useState("");

  const [theme, setTheme] = React.useState(true);
  const appliedTheme = createMuiTheme(theme ? lightTheme : darkTheme);

  // When jwt changes, this calls the setAxiosDefaults function to set the authorization header to the jwt
  useEffect(() => {
    if (jwt) {
      setAxiosDefaults(jwt);
    }
  }, [jwt]);

  return (
    <div className="App">
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Router>
          <Header theme={theme} setTheme={setTheme} />
          <AuthContext.Provider value={{ jwt, setJwt, username, setUsername }}>
            <Switch>
              <ProtectedRoute
                exact
                path="/algorithms/new"
                component={AddAlgorithm}
              />
              <ProtectedRoute
                exact
                path="/algorithms/edit/:algorithmId"
                component={EditAlgorithm}
              />
              <ProtectedRoute
                exact
                path="/algorithms/:algorithmId"
                component={Challenge} theme={theme}
              />
              <ProtectedRoute exact path="/home" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Login} />
              <Route path="/" component={NotFound} />
            </Switch>
          </AuthContext.Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
