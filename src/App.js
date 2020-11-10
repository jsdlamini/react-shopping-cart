import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Payment from "./components/Payment";
import Header from "./Header";
import Orders from "./Orders";

// Stripe payment settings

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HckxbBMuQQ6In03dYj5bWu7lg8vUhthQ8K0xZWa9fHkqtDNAP0xcHDEosABjMgKHV1APWS8hWaSljNKnuYia0Ww00QKGkX3Az"
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>

        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
