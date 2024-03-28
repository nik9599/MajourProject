import React from "react";
import "./paymentCard.css";

export default function PaymentCard({
  product_name = "Noodles",
  product_quantity = 0,
  product_price = 0,
}) {
  const total = product_price * product_quantity;
  return (
    <div className="product-container">
      <div style={{display:"flex" ,width :"100%" , justifyContent:"space-evenly"}} >
        <div className="name-div-card">
          {" "}
          <p>{product_name}</p>
        </div>
        <div className="quantity-div-card">
          {" "}
          <p> {product_quantity} </p>
        </div>
        <div className="price-div-card">
          {" "}
          <p> {product_price} </p>
        </div>
        <div className="total-div-card">
          {" "}
          <p> {total} </p>
        </div>
      </div>
      <div className="saperator"></div>
    </div>
  );
}
