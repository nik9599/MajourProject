import React, { useEffect, useState } from "react";
import "./payment.css";
import PaymentCard from "../PaymentCard/PaymentCard.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";
import NavBar from "../NavBar/NavBar.jsx";
import { putRequest } from "../../API/API.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Payment() {
  // const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const orderId = window.location.pathname.split("/").pop();
  const navigator = useNavigate();
  const total = cartObservabel.getTheTotal();


  //----------------------------------useEffect hook for getting cart item--------------------

  useEffect(() => {
    const getCartItem = () => {
      setCartItem(cartObservabel.getData());
    };
    getCartItem();
  }, [cartItem]);  

  //---------------------------------handel payment status----------------------------------

  const handlePaymentStatus = async () => {
    const paymentData = {
      total_amount: total,
      status: "Approved",
      orderId: orderId,
      payment_mode : "Online"
    };

    const resp = await putRequest(paymentData, "/updateOrder", token);

    console.log(resp);

    if (resp.success) {
      setPaymentDone(!paymentDone);
      window.localStorage.clear();
      cartObservabel.removeAllItem();
      navigator("/cart");
    }
  };

  return (
    <div className="pay-container">
      <div className="Navbar-container">
        <NavBar />
      </div>
      <h3> Order ID #{orderId} </h3>
      <div className="header-container">
        <div className="name-div">
          {" "}
          <p>Product Name</p>
        </div>
        <div className="quantity-div">
          {" "}
          <p> Quantity</p>
        </div>
        <div className="price-div">
          {" "}
          <p> Price</p>
        </div>
        <div className="total-div">
          {" "}
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
      <div style={{ marginLeft: "60%", fontWeight: "bold", marginTop: "10px" }}>
        {" "}
        <p> Grand Total : {total}</p>{" "}
      </div>
      {/* {paymentMode && (
        <div
          style={{ marginLeft: "63%", fontWeight: "bold", marginTop: "10px" }}
        >
          {" "}
          <p> Payment Mode : {paymentMode}</p>{" "}
        </div>
      )} */}
      {paymentDone && (
        <div
          style={{ marginLeft: "64%", fontWeight: "bold", marginTop: "10px" }}
        >
          {" "}
          <p> Payment Completed</p>{" "}
        </div>
      )}
      <div className="footer-container">
        <div
          className={`p-div-container ${
            paymentDone ? "p-div-container-done" : ""
          } `}
          tabIndex="0"
          onClick={handlePaymentStatus}
        >
          <p>Payment</p>
        </div>
      </div>
    </div>
  );
}
