import React, { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import SummaryItem from "../SummaryItem";

import { ContextState } from "../../context/contextState";

function getTotal(cart) {
  // reduce for callback function on each element of the array
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function SummaryTotal({ ...props }) {
  const value = useContext(ContextState); // useContext is used to pass data through the component tree without having to pass props.
  const { cartItems } = value;

  return (
    <aside {...props}>
      <div className="row flex-column">
        <div className="col shopping__cart__header">
          <h2 className="h3 mt-2 text-primary">
            <GiShoppingCart className="text-primary" size={35} /> Your basket
          </h2>
          <hr className="mb-3" />
        </div>
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
        <div className="col shopping__cart__footer">
          <div className="row row-cols-1 flex-column">
            <div className="col">
              <div className="d-flex justify-content-between">
                <h4 className="h4">Total</h4>
                <h4>
                  <strong className="text-primary">
                    {getTotal(cartItems)}€
                  </strong>
                </h4>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SummaryTotal;
