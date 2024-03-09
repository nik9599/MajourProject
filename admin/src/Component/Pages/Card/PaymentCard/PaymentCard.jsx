import React from "react";
import "./paymentCard.css";

export default function PaymentCard({
  product_name = "Noting",
  product_quantity =0,
  product_price =0,
}) {
  const total = product_price * product_quantity;
  return (
    <div className="product-container" >
      <p>{product_name}</p>
      <p> {product_quantity} </p>
      <p> {product_price} </p>
      <p> {total} </p>
      <div className="saperator" ></div>
    </div>
  );
}
