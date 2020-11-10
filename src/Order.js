import React from "react";
import "./Order.css";
import moment from "moment";
import Fade from "react-reveal/Fade";
import formartCurrency from "./util";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>

      <Fade left cascade>
        <ul className="cart-items">
          {order.data.cartItems.map((item) => (
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
                    //   onClick={() => removeFromCart(item)}
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
      <h3 className="order__total">
       <strong> Order Total: {formartCurrency(order.data.amount)}{" "}</strong>
      </h3>
      {/* <p className="order__id">
        <small>{order.data.amount}</small>
      </p> */}
    </div>
  );
}

export default Order;
//
