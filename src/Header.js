import React, { useContext } from "react";
import "./Header.css";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { CartContext } from "./contexts/CartContext";

function Header() {
  const { clearCart } = useContext(CartContext);

  return (
    <div className="header">
      <div className="store__name">
        <header>
          <a href="/">
            <strong>Online Shop </strong>
          </a>
        </header>
      </div>

      <div className="cart__icons">
        <h4>
          Clear Cart 
          <RemoveShoppingCartIcon
            onClick={() => clearCart()}
            fontSize="large"
            style={{ color: "white", cursor: "pointer" }}
          />
        </h4>
      </div>
    </div>
  );
}

export default Header;
