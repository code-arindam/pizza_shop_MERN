import React from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { useHistory } from "react-router-dom";
const Checkout = ({ subTotal }) => {
  const history = useHistory();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
    localStorage.removeItem("cartItems");
    window.location.href = "/cart";
  };

  const handlePayNow = () => {
    history.push("/login");
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Order placed success" />}
      {!currentUser ? (
        <Button onClick={handlePayNow}>Pay Now</Button>
      ) : (
        <StripeCheckout
          amount={subTotal * 100}
          shippingAddress
          token={tokenHandler}
          stripeKey="pk_test_51HT3awLRpPHpN9zVZksDRZ16m6HANATIi914WwDG7xbmNKQGsMyXEBTuUxlNZlkZ3EYFsfu5t0NQDeNQYbukyICZ000lVzvD9Y"
          currency="INR"
        >
          <Button id="pay-now-btn">Pay Now</Button>
        </StripeCheckout>
      )}
    </>
  );
};

export default Checkout;
