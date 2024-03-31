import React, { useEffect, useState } from "react";
import "./orderdetail.css";
import PaymentCard from "../Card/PaymentCard/PaymentCard";
import { postRequest, getRequest, putRequest } from "./../../API/API.js";
import { useSelector } from "react-redux";

export default function OrderDetail({ order_id = "0", customer_id = "0" }) {
  const token = useSelector((state) => state.login.login.token);
  const orderId = useSelector((state) => state.state.OrderDetail.orderid);
  const customerId = useSelector((state) => state.state.OrderDetail.customerId)
  const orderDetail = useSelector(state =>state.state.OrderDetail);
  const [orderData, setOrderData] = useState([]);
  const [userDetail, setUserDetail] = useState({
    username: "",
    mobile: "",
  });

  useEffect(() => {

    const fetchIngData = async () => {
      //-------------------fetching the data of order----------------------------------
      const data = { orderId };
      const resp = await postRequest(data, "/getTheOrderById", token);
      console.log(resp);
      if (resp.success) {
        setOrderData(resp.data);
      }
    };

    //------------------fetching the user data---------------------------------------

    const getUserById = async () => {
      const resp = await getRequest(null, `/getUserById/${customerId}`, token);
       console.log(resp);
      if (resp.success) {
        setUserDetail({
          username: resp.data[0].username,
          mobile: resp.data[0].mobile,
        });
      }
    };
    

      fetchIngData();
      getUserById();

      console.log(orderData.length);

  }, [orderId]);

  //----------------------------function for change the status of order-----------------------

  const orderCompleted = async () => {
    console.log(orderData);
    const data = {
      total_amount: orderData[0].total_order_price,
      status: "Completed",
      orderId: order_id,
    };
     console.log(data);
    const resp = await putRequest(data, "/updateOrder", token);
    if (resp.success) {
      window.location.reload();
    }
  };

  return (
    <div className="orderdetail-container">
      {orderData.length != 0 && (
        <div className="orderId-container">
          <div>
            {" "}
            <h2>Order ID#{order_id}</h2>{" "}
          </div>
          <div>
            {" "}
            <p>{userDetail.username}</p> <p>{userDetail.mobile}</p>{" "}
          </div>
        </div>
      )}
      {orderData.length == 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            fontSize: "30px",
            color: "lightgray",
            fontWeight: "600",
          }}
        >
          {" "}
          <p> There is no order </p>{" "}
        </div>
      ) : (
        <div className="order-item-container">
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
          <div className="card-detail-container">
            {orderData.map((order) => (
              <PaymentCard
                product_name={order.product_name}
                product_quantity={order.quantity}
                product_price={order.price_per_unit}
              />
            ))}
          </div>
        </div>
      )}

      {orderData.length != 0 && (
        <div className="order-completed-container">
          {" "}
          <button onClick={orderCompleted}>Completed</button>{" "}
        </div>
      )}
    </div>
  );
}
