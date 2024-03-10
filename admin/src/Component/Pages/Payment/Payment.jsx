import React, { useState } from "react";
import "./payment.css";
import PaymentCard from "../Card/PaymentCard/PaymentCard";
import DropDown from "../Card/DropDown/DropDown";


export default function Payment({cartItem , total}) {
  // const [total, setTotal] = useState(250);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone ,setPaymentDone] = useState(false)
   

  const handlePaymentStatus = ()=>{
    if (!paymentDone) {
      setPaymentDone(!paymentDone);
    }
  }

  return (
    <div className="pay-container">
      <h3  > Order ID #123 </h3>
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
      <div className="card-div">
        {cartItem.map((items)=>(
            <PaymentCard  product_name = {items.product_name}
            product_quantity = {items.product_quantity}
            product_price = {items.product_price}/>
        ))}
        
      </div>
      <div
          style={{ marginLeft: "66%", fontWeight: "bold", marginTop: "10px" }}
        >
          {" "}
          <p> Grand Total : {total}</p>{" "}
        </div>
        {paymentMode && (
          <div
            style={{ marginLeft: "63%", fontWeight: "bold", marginTop: "10px" }}
          >
            {" "}
            <p> Payment Mode : {paymentMode}</p>{" "}
          </div>
        )}
         {paymentDone && (
          <div
            style={{ marginLeft: "64%", fontWeight: "bold", marginTop: "10px" }}
          >
            {" "}
            <p> Payment Completed</p>{" "}
          </div>
        )}
      <div className="footer-container">
        <div className="drop-container">
          <DropDown selected={paymentMode} setSelected={setPaymentMode} />
        </div>
        <div className={`p-div-container ${paymentDone ? 'p-div-container-done':''} `}tabIndex="0" onClick={handlePaymentStatus} >
          <p>Payment Done</p>
        </div>
        <div className="p-div-container" tabIndex="1">
          <p>Order Completed</p>
        </div>
      </div>
    </div>
  );
}
