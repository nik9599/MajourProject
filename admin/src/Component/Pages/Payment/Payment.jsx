import React, { useState } from "react";
import "./payment.css";
import PaymentCard from "../Card/PaymentCard/PaymentCard";
import DropDown from "../Card/DropDown/DropDown";
import { putRequest } from "../../API/API.js";
import { useSelector } from "react-redux";
import Landing from "../LandingPage/Landing.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";

export default function Payment({ cartItem, total, oderId }) {
  // const [total, setTotal] = useState(250);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const token = useSelector((state) => state.login.login.token);

  const handlePaymentStatus = async () => {
    console.log(oderId);

    const paymentData = {
      total_amount: total,
      status: "Approved",
      orderId: oderId,
    };

    const resp = await putRequest(paymentData, "/updateOrderOffline", token);

    // console.log(resp);

    if (resp.success) {
      const paymentData = {
        total_amount: total,
        status: "Completed",
        payment_mode: paymentMode,
        orderId: oderId,
      };
      const resp = await putRequest(paymentData, "/updateOrderOffline", token);
      if (resp.success) {
        setPaymentDone(!paymentDone);
      }
    }
  };

  const orderCompleted = () => {
    window.localStorage.clear();
    cartObservabel.removeAllItem();
    setIsOrderCompleted(true);
  };

  return (
    <div className="pay-container">
      {isOrderCompleted ? (
        <Landing />
      ) : (
        <>
          <h3>Order ID #{oderId}</h3>
          <div className="header-container">
            <div className="name-div">
              <p>Product Name</p>
            </div>
            <div className="quantity-div">
              <p>Product Quantity</p>
            </div>
            <div className="price-div">
              <p>Product Price</p>
            </div>
            <div className="total-div">
              <p>Total</p>
            </div>
          </div>
          <div className="card-div">
            {cartItem.map((items) => (
              <PaymentCard
                product_name={items.product_name}
                product_quantity={items.product_qantity}
                product_price={items.product_price}
              />
            ))}
          </div>
          <div
            style={{ marginLeft: "66%", fontWeight: "bold", marginTop: "10px" }}
          >
            <p> Grand Total : {total}</p>
          </div>
          {paymentMode && (
            <div
              style={{
                marginLeft: "63%",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              <p> Payment Mode : {paymentMode}</p>
            </div>
          )}
          {paymentDone && (
            <div
              style={{
                marginLeft: "64%",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              <p> Payment Completed</p>
            </div>
          )}
          <div className="footer-container">
            <div className="drop-container">
              <DropDown selected={paymentMode} setSelected={setPaymentMode} />
            </div>
            <div
              className={`p-div-container ${
                paymentDone ? "p-div-container-done" : ""
              }`}
              tabIndex="0"
              onClick={handlePaymentStatus}
            >
              <p>Payment Done</p>
            </div>
            <div
              className="p-div-container"
              tabIndex="1"
              onClick={() => {
                orderCompleted();
              }}
            >
              <p>Order Completed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
