import React, { useEffect, useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import { useSelector, useDispatch } from "react-redux";
import { OrdeerDetail } from "../../utils/Redux/slice/stateSlice/stateSlice.js";
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer";
import { io } from "socket.io-client";

// making connection witrh socket-server

const socket = io.connect("http://localhost:8080");

export default function OrderList() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      socket.on("new-order", (order) => setOrderList(order));
      if (orderList.length == 0) {
        socket.emit("get-the-order");
        socket.on("new-order1", (order) => setOrderList(order));
      }
    };

    fetchData();

    return () => {
      socket.off("new-order");
    };
  }, [token]);

  const handleCardClick = (orderId, customer_id) => {
    setSelectedOrderId(orderId);

    dispatch(OrdeerDetail({ customerId: customer_id, orderid: orderId }));
  };
  return (
    <div className="OrderList-container">
      {orderList.length == 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <OrderListShimmer key={index} />
          ))
        : orderList.map((item, index) => (
            <OrderListCard
              key={index}
              token={token}
              order_id={item.orderid}
              create_by={item.customer_id}
              isSelected={selectedOrderId === item.orderid}
              price={item.total_amount}
              handleClick={() =>
                handleCardClick(item.orderid, item.customer_id)
              }
            />
          ))}
    </div>
  );
}
