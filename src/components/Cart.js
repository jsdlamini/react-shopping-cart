import React, { Component, useState } from "react";
import formartCurrency from "../util";
import Fade from "react-reveal/Fade";
import { useHistory  } from "react-router-dom";
import Payment from "./Payment";

//  <Cart cartItems={cartItems} removeFromCart={removeFromCart} />{" "}
function Cart({ cartItems, removeFromCart }) {
  const history = useHistory();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState({});

  

  const handleInput = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    e.target.name = e.target.value;
  };

  const createOrder = (e) => {
    e.preventDefault();
    setOrder({
      name: setName(name),
      email: setEmail(email),
      address: setAddress(address),
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    });

    createOrder(order);
  };

  const closeModal = () => {
    //  clearOrder();
  };

  //const { cartItems } = this.props;

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header"> Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          {" "}
          You have {cartItems.length} items in the cart{" "}
        </div>
      )}

      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    {item.title}
                    <div className="right">
                      {formartCurrency(item.price)} X {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => removeFromCart(item)}
                      >
                        {" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formartCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className="button primary"
                  onClick={() => {
                    setShowCheckout(true);
                  }}
                >
                  {" "}
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Full Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit" onClick={ e => history.push('/payment')}>
                          Proceed to Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
