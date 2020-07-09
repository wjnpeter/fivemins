import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./components/Home"
import DBPortal from "./components/DBPortal"

function App() {

  return <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <DBPortal />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;
