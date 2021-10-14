import React from "react";
import "./Card.scss";

function Card() {
  return (
    <>
      <div className="container__card">
        <div className="card__front card__part">
          <p className="card_numer">**** **** **** 6258</p>
          <div className="card__space-75">
            <span className="card__label">Card holder</span>
            <p className="card__info">CARDHOLDER NAME</p>
          </div>
          <div className="card__space-25">
            <span className="card__label">Expires</span>
            <p className="card__info">05/31</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
