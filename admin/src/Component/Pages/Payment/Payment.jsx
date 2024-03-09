import React from "react";
import "./payment.css";
import PaymentCard from "../Card/PaymentCard/PaymentCard";

export default function Payment() {
  return (
    <div className="pay-container">
      <div className="header-container">
        <div className="name-div">
          {" "}
          <p>Product Name</p>
        </div>
        <div className="quantity-div">
          {" "}
          <p>Product Quantity</p>
        </div>
        <div className="price-div">
          {" "}
          <p>Product Price</p>
        </div>
        <div className="total-div">
          {" "}
          <p>Total</p>
        </div>
      </div>
      <div className="card-div" >
        <PaymentCard />
      </div>
      <div></div>
    </div>
  );
}
