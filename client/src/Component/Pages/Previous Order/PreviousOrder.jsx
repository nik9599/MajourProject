import React, { useEffect, useState } from "react";
import "./previousOrder.css";
import NavBar from "../NavBar/NavBar";
import OrderCard from "../OrderCard/OrderCard";
import { useSelector } from "react-redux";
import { getRequest } from "../../API/API.js";
import formatDate from "../../utils/CommonFunction/dateFormate.js";

export default function PreviousOrder() {
  const userId = useSelector((state) => state.login.login.userId);
  const token = useSelector((state) => state.login.login.token);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getRequest(
          null,
          `/userOrder/completed/${userId}`,
          token
        );
        if (resp.success) {
          setOrderData(resp.data);
        }
      } catch (error) {
        console.log("error while fetchin data", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="previousOrder-container">
      <div className="navbar-container">
        <NavBar />
      </div>

      <div className="order-list">
        {orderData.map((order, i) => (
          <OrderCard
            orderId={order.orderid}
            orderAmount={order.total_amount}
            orderData={formatDate(order.order_date)}
            orderStatus={order.status}
          />
        ))}
      </div>
    </div>
  );
}
