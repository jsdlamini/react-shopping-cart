import React, { useContext, useEffect, useState } from "react";
import "./Payment.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import formartCurrency from "../util";
import Fade from "react-reveal/Fade";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../axios";
import db from "../Firebase";
import { CartContext } from "../contexts/CartContext";

import Product from "./Product";

function Payment({
  name,
  address,
  email,

  order,
}) {
  const location = useLocation();
  const history = useHistory();

  // Stripe set up
  const stripe = useStripe();
  const elements = useElements();

  //
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const { cartItems, total, clearCart } = useContext(CartContext);

  useEffect(() => {
    //generate the special stripe secrete which allows us to charge a customer.
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunites, hence multiply by 100 to get cents for amount in $(USD)
        url: `/payments/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cartItems]);

  console.log("The secrete is >>>>", clientSecret);

  const handleSubmit = async (event) => {
    //Do the Stripe stuff
    event.preventDefault();
    setProcessing(true); //Allow the clicking of the Buy Now button once and then block

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //Attemt to create a user if it does not exist
        // console.log("About to create users");
        db.collection("users")
          .add({
            email: location.email,
            name: location.name,
            address: location.address,
          })
          .then(function () {
            console.log("User successfully created!");
          })
          .catch(function (error) {
            console.error("Error creating user: ", error);
          });

        // console.log("User created.....adding orders now");

        //Create Order for that user
        db.collection("users")
          .doc(location.email)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cartItems: cartItems,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            // email: location.email,
          })
          .then(function () {
            console.log("order successfully created!");
          })
          .catch(function (error) {
            console.error("Error creating order: ", error);
          });
        // console.log("Orders created.....");
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //Empty Basket
        // location.cartItems = [];

        history.replace({ pathname: "/orders", email: location.email });
      });
  };

  const handleChange = (event) => {
    // 1. Listen for changes inside the CardElement
    // 2. Display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ( <Link to="#"> {cartItems.length} items </Link>) .
        </h1>
        {/* Payment section  - delivery adddress */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p> {location.name}</p>
            <p>{location.address}</p>
            <p> {location.email}</p>
          </div>
        </div>
        {/* Payment section  -  review items */}

        <Fade bottom cascade={true}>
          <ul className="products">
            {cartItems.map((product) => (
              <Product product={product} />
            ))}
          </ul>
        </Fade>

        {/* Payment section  -  payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Strpie magic goes here */}
            <form onSubmit={handleSubmit}>
              <CardElement
                onChange={handleChange}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <div className="payment__priceContainer">
                <div>
                  <strong> Order Total : {formartCurrency(total)} </strong>
                </div>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p> Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div> {error} </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
