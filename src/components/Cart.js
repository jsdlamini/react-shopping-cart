import React, { Component, useContext, useState } from "react";
import formartCurrency from "../util";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Payment from "./Payment";
import { useStateValue } from "../StateProvider";
import { CartContext } from "../contexts/CartContext";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";

function Cart() {
  // const [ cart ,setCart, totalPrice ]= useContext(CartContext);
  //const { increase, decrease, removeProduct } = useContext(CartContext);
  const {
    cartItems,

    clearCart,
    increase,
    decrease,
    removeProduct,
    total,
    itemCount,
    checkout,
    handleCheckout,
  } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState({});

  const handleInput = (e) => {
    e.preventDefault();
    [e.target.name] = e.target.value;
    // console.log(e.target.value);
  };

  const updateName = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    setName(e.target.value);
  };
  const updateEmail = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    setEmail(e.target.value);
  };
  const updateAddress = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    setAddress(e.target.value);
  };

  // const createOrder = (e) => {
  //   e.preventDefault();
  //   setOrder({
  //     name: setName(name),
  //     email: setEmail(email),
  //     address: setAddress(address),
  //     cartItems: basket,
  //     total: basket.reduce((a, c) => a + c.price * c.count, 0),
  //   });

  //   createOrder(order);
  // };

  const closeModal = () => {
    //  clearOrder();
  };

  //const { cartItems } = this.props;

  return (
    <div className="cart">
      {/* <Fade left cascade> */}

      {cartItems.length === 0 ? (
        <div className="cart cart-header"> Cart is empty </div>
      ) : (
        <>
          <div className="cart-header">
            <h4>
              Grand Total : {formartCurrency(total)} ( {itemCount} items ){" "}
            </h4>
            <br />
            <button
              //className="button primary"
              className="button primary "
              onClick={() => {
                setShowCheckout(true);
              }}
            >
              Checkout
            </button>
            <br />
            {cartItems.length !== 0 && (
              <div>
                {showCheckout && (
                  <Fade right cascade>
                    <div className="cart">
                      <form onSubmit={""}>
                        <ul className="form-container">
                          <li>
                            <label>Email</label>
                            <input
                              name="email"
                              type="email"
                              required
                              onChange={updateEmail}
                            ></input>
                          </li>
                          <li>
                            <label>Full Name</label>
                            <input
                              name="name"
                              type="text"
                              required
                              onChange={updateName}
                            ></input>
                          </li>
                          <li>
                            <label>Address</label>
                            <input
                              name="address"
                              type="text"
                              required
                              onChange={updateAddress}
                            ></input>
                          </li>
                          <li>
                            {/* {console.log("name is .... : ", name)} */}
                            <button
                              className="button primary"
                              type="submit"
                              onClick={(e) =>
                                history.push({
                                  pathname: "/payment",
                                  name: name,
                                  address: address,
                                  email: email,

                                  order: order,
                                })
                              }
                            >
                              Proceed to Pay
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
        </>
      )}

      {cartItems.map((item) => (
        <div className="cart__item">
          <div className="cart__header">
            <h4>{item.title}</h4>
          </div>

          <div className="image__and__detail">
            <div className="cart__image">
              <span className="notify-badge">
                {/* <div className="qty_section"> */}
                <span> {item.quantity} </span>
                {/* </div> */}
              </span>
              <img src={item.image} alt={item.title} />
            </div>

            <div className="cart__item_detail">
              <div className="unit__price">
                Price: {formartCurrency(item.price)}
              </div>
              <div className="total__price">
                Total: {formartCurrency(item.price * item.quantity)}{" "}
              </div>
            </div>
          </div>

          <div className="cart__buttons">
            <div className="remove__btn">
              {item.quantity > 1 ? (
                <button
                  onClick={() => decrease(item)}
                  // className="btn btn-danger btn-sm mb-1"
                >
                  <RemoveCircleIcon
                    fontSize="large"
                    style={{ color: "red", fontSize: 40 }}
                  />
                </button>
              ) : (
                item.quantity === 1 && (
                  <button
                    onClick={() => removeProduct(item)}
                    // className="btn btn-danger btn-sm mb-1"
                  >
                    <DeleteIcon
                      fontSize="large"
                      style={{ color: "red", fontSize: 40 }}
                    />
                  </button>
                )
              )}
            </div>

            <div className="add_btn">
              <button
                onClick={() => increase(item)}
                // className="btn btn-primary btn-sm mr-2 mb-1"
              >
                <AddCircleIcon
                  fontSize="large"
                  style={{ color: "green", fontSize: 40 }}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
