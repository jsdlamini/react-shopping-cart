import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";


import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

import CartContextProvider from './contexts/CartContext'

ReactDOM.render(
  // <React.StrictMode>
  //   <StateProvider >
  <CartContextProvider>
    <App />
    </CartContextProvider>,
  //   </StateProvider>
  // </React.StrictMode>,
  document.getElementById("root")
);
