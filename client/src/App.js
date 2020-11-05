import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Home from "./containers/Home/Home";
import Challenge from "./containers/Challenge/Challenge";
import EditAlgorithm from "./containers/EditAlgorithm/EditAlgorithm";
import AddAlgorithm from "./containers/AddAlgorithm/AddAlgorithm";
import NotFound from "./containers/NotFound/NotFound";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/algorithms/new" component={AddAlgorithm} />
          <Route exact path="/algorithms/:algorithmId/edit" component={EditAlgorithm} />
          <Route exact path="/algorithms/:algorithmId" component={Challenge} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Login} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
