import React, { useEffect, useState } from "react";
import "./Orders.css";
import db from "./Firebase";
import { useLocation } from "react-router";
import Order from "./Order";

function Orders({ email }) {
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
      <h1> Your orders </h1>
      <div className="orders__order">
       
        {orders?.map((order) => (
          <Order order={order} />
        ))} 
      </div>
    </div>
  );
}

export default Orders;
