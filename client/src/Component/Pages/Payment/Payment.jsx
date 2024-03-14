import React, { useEffect, useState } from "react";
import "./payment.css";
import PaymentCard from "../PaymentCard/PaymentCard.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";
import NavBar from "../NavBar/NavBar.jsx";

export default function Payment() {
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDone ,setPaymentDone] = useState(false);
  const [cartItem , setCartItem] = useState([]);
  

  useEffect(()=>{
    const getCartItem = ()=>{
     setCartItem(cartObservabel.getData())
    }

    getCartItem();
    
  },[cartItem])
   
  const total = cartObservabel.getTheTotal();

  const handlePaymentStatus = ()=>{
    if (!paymentDone) {
      setPaymentDone(!paymentDone);
    }
  }

  return (
    <div className="pay-container">
      <div className="Navbar-container" >
        <NavBar/>
      </div>
      <h3  > Order ID #123 </h3>
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
        {cartItem.map((items)=>(
            <PaymentCard  product_name = {items.product_name}
            product_quantity = {items.product_qantity}
            product_price = {items.product_price}/>
        ))}
        
      </div>
      <div
          style={{ marginLeft: "60%", fontWeight: "bold", marginTop: "10px" }}
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
        
        <div className={`p-div-container ${paymentDone ? 'p-div-container-done':''} `}tabIndex="0" onClick={handlePaymentStatus} >
          <p>Payment</p>
        </div>
       
      </div>
    </div>
  );
}
