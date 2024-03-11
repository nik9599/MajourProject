import React, { useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import "./orderList.css";

export default function OrderList() {
  const [orderList, setOrderList] = useState([]);
  return (
    <div className="OrderList-container">
      <OrderListCard />
      <OrderListCard />
      <OrderListCard />
      <OrderListCard />
      <OrderListCard />
      <OrderListCard />
      <OrderListCard />
    </div>
  );
}
