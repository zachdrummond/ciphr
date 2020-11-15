// React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// File Modules
import AddAlgorithm from "./containers/AddAlgorithm/AddAlgorithm";
import AllAlgorithms from "./containers/AllAlgorithms/AllAlgorithms";
import AuthContext from "./context/AuthContext/AuthContext";
import Challenge from "./containers/Challenge/Challenge";
import EditAlgorithm from "./containers/EditAlgorithm/EditAlgorithm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./containers/Login/Login";
import MyAlgorithms from "./containers/MyAlgorithms/MyAlgorithms";
import NotFound from "./containers/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import setAxiosDefaults from "./utils/setAxiosDefaults";
import SignUp from "./containers/SignUp/SignUp";

// define dark/light themes

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#8000FF",
    },
    secondary: {
      main: "#8000FF",
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', Helvetica, Arial, sans-serif",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#A07EFF",
    },
    secondary: {
      main: "#A07EFF",
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', Helvetica, Arial, sans-serif",
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
          <AuthContext.Provider value={{ jwt, setJwt, username, setUsername }}>
            <Header theme={theme} setTheme={setTheme} />
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
                component={Challenge}
                theme={theme}
              />
              <ProtectedRoute
                exact
                path="/algorithms"
                component={MyAlgorithms}
              />
              <ProtectedRoute exact path="/home" component={AllAlgorithms} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Login} />
              <Route path="/" component={NotFound} />
            </Switch>
          </AuthContext.Provider>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
