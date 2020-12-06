import React, { createContext, useReducer, useState } from "react";
import { CartReducer, sumItems } from "./CartReducer";

export const CartContext = createContext();

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (item) => {
    dispatch({ type: "INCREASE", item });
  };

  const decrease = (item) => {
    dispatch({ type: "DECREASE", item });
  };

  const addProduct = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeProduct = (item) => {
    dispatch({ type: "REMOVE_ITEM", item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    
    ...state,
  };

  //Examples
  // const [cart, setCart] = useState([]);


  return (
    //  <CartContext.Provider value={contextValues} >
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
