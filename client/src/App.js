import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/books/new" component={NewBook} />
          <Route exact path="/books/:bookId/edit" component={EditBook} />
          <Route exact path="/books/:bookId" component={SingleBook} />
          <Route exact path="/books" component={AllBooks} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
