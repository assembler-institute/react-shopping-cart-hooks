import React, { useContext } from "react";
import { ContextState } from "../../context/contextState";

import "./CartItem.scss";

function SummaryItem({ img, title, price, quantity }) {
  const value = useContext(ContextState);
  const { currentStep } = value;
  return (
    <div className={currentStep === 4 ? "col col-5 pl-0 mb-3" : "col"}>
      <div className="row flex-column">
        <div className={currentStep === 4 ? "col p-0" : "col"}>
          <div className={currentStep === 4 ? "d-flex" : "row"}>
            <div className="col-12 col-xl-4 mb-3 mb-xl-0">
              <img className="ShoppingCartItem__img" src={img} alt="" />
            </div>
            <div className="col-12 col-xl-8">
              <div className="row flex-column">
                <div className="col">
                  <h4 className="h5">
                    <strong>{title}</strong>
                  </h4>
                </div>
                <div className="col">
                  <p>
                    <strong>{price}€</strong>
                  </p>
                </div>
                <div className="col d-flex flex-row m-auto">
                  <div className="mr-3">quantity:</div>
                  <div className="">{quantity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {currentStep < 4 && (
          <div className="col">
            <hr />
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryItem;
