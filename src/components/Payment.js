import React from "react";
import "./Payment.css";

function Payment({ fullname, deliveryAddress, email }) {
  return (
    <div className="payment">
      <div className="payment__container">
        {/* Payment section  - delivery adddress */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p></p>
          </div>
        </div>
        {/* Payment section  -  review items */}
        <div className="payment__section"></div>
        {/* Payment section  -  payment method*/}
        <div className="payment__section"></div>
      </div>
    </div>
  );
}

export default Payment;
