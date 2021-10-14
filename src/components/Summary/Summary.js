import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextState } from "../../context/contextState";
import { ACTIONS } from "../../context/reducerState";
import SummaryItem from "../SummaryItem";

function getTotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function SummaryTotal() {
  const value = useContext(ContextState);
  const { cartItems, account, billing, payment, dispatch } = value;
  return (
    <div className="p-3 shadow-sm">
      <div className="border-bottom mb-4">
        <h2 className="text-primary mb-5">Your order has been Confirmed!</h2>
        <h5>{`Hi ${account.userName},`}</h5>
        <p>Your order has been confirmed and will be shipping soon.</p>
      </div>
      <div className="d-flex border-bottom mb-4">
        <div className="w-25">
          <h6 className="text-black-50">Address</h6>
          <p className="m-0">{billing.address}</p>
          <p className="m-0">{billing.postCode}</p>
          <p className="m-0">{billing.city}</p>
          <p className="mb-3">{billing.country}</p>
        </div>
        <div className="w-25">
          <h6 className="text-black-50">Payment Type</h6>
          <p className="m-0">{payment.paymentType}</p>
          <p className="m-0">{payment.cardholderName}</p>
          <p className="m-0">{payment.cardNumber}</p>
          <p className="mb-3">{payment.cardExpiryDate}</p>
        </div>
      </div>
      <div className="d-flex flex-column border-bottom mb-4">
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <SummaryItem
              key={item.id}
              title={item.title}
              price={item.price}
              img={item.img}
              quantity={item.quantity}
            />
          ))}
      </div>
      <div className="d-flex flex-column justify-content-between border-bottom mb-4 pb-3">
        <div className="d-flex justify-content-between">
          <h6>Subtotal</h6>
          <h6>{getTotal(cartItems)}€</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Shipping</h6>
          <h6>0€</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Taxes</h6>
          <h6>0€</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h4>Total</h4>
          <h4>{getTotal(cartItems)}€</h4>
        </div>
      </div>
      <div className="d-flex justify-content-between pb-3">
        {`Your order has been confirmed. We'll send you shipping confirmation to ${account.emailAdress} when your item(s) are on the way! Enjoy your purchase!`}
      </div>
      <Link to="/" onClick={() => dispatch({ type: ACTIONS.CLEAR_INFO })}>
        <button type="button" className="btn btn-primary">
          Back Home
        </button>
      </Link>
    </div>
  );
}

export default SummaryTotal;
