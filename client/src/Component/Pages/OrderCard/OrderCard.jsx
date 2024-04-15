import React from "react";
import "./orderCard.css";

export default function OrderCard({
  orderId = 0,
  orderAmount = 0,
  orderData = "01/01/2000",
  orderStatus = "null",
}) {
  return (
    <div className="orderCard-container">
      <div className="orderCard-Left">
        <div className="orderId-container">orderId #{orderId}</div>
        <div className="orderData-container"> Date {orderData}</div>
      </div>
      <div className="orderCard-Right">
        <div className="orderStatus-container" style={{ color: orderStatus === 'pending' ? 'red' : 'green' }} >{orderStatus}</div>
        <div className="orderAmount-contianer"> { orderStatus == 'pending' ?"Due": "Payed"} {orderAmount}</div>
      </div>
    </div>
  );
}
