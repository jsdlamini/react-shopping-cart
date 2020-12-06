import React, { useContext, useEffect } from "react";
// import { useStateValue } from "../StateProvider";
import formartCurrency from "../util";
import { CartContext } from "../contexts/CartContext";
//_id, image, title, price, description, availableSizes
function Product({ product }) {
  const { addProduct, cartItems, increase } = useContext(CartContext);
  
  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  return (
 
      <li key={product._id}>
        <div className="product">
          <a href={"#" + product.title}>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
          </a>
          <div className="product-price">
            <div>{formartCurrency(product.price)} </div>
            {/* <button
              onClick={() => addProduct(product)}
              className="button primary"
            >
              Add To Cart
            </button> */}

            {isInCart(product) && (
              <button
                onClick={() => increase(product)}
                className="button_addMore"
              >
                Add more
              </button>
            )}

            {!isInCart(product) && (
              <button
                onClick={() => addProduct(product)}
                className="button_proceed"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </li>
 
  );
}

export default Product;
