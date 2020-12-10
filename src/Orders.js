import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import db from "./Firebase";
import { useLocation } from "react-router";
import Order from "./Order";
import { CartContext } from "./contexts/CartContext";

function Orders({ email }) {
  const { clearCart } = useContext(CartContext);
  const location = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (location.email) {
      db.collection("users")
        .doc(location.email)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [location.email]);

  return (
    <div className="orders">
      <div className="deliver__message">
        <h3>
          Your order has been successfully processed... <br /> Expect your items
          to be delivered within 10 days for delivery.
          <br />
          For more shopping,{" "}
          <a href="/">
            <strong onClick={() => clearCart()}>Click HERE. </strong>
          </a>{" "}
        </h3>
      </div>

      <div className="orders__order">
        <h1> Your orders </h1>

        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
