import React, { useEffect, useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import { useSelector, useDispatch } from "react-redux";
import { OrdeerDetail } from "../../utils/Redux/slice/stateSlice/stateSlice.js";
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer";
import { getRequest } from "../../API/API.js";


export default function OrderList() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getRequest(null, "/activeOrder", token);
  
      if (resp.success) {
        setOrderList(resp.data);
      }
    };
  
    // Initial call
    fetchData();
  
    // Setup interval to fetch data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes in milliseconds
  
    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
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
