import React from "react";
import {  BrowserRouter as Router, Switch , Route } from "react-router-dom";
import Home from "./Home";
import Payment from "./components/Payment";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
