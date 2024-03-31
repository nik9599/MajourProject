import React, { useEffect, useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { CompletedOrder } from "../../utils/Redux/slice/stateSlice/stateSlice.js";
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer.jsx";
import { getRequest } from "../../API/API.js";

export default function CompletedOrderList() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      const resp = await getRequest(null, "/completedOrder", token);
      console.log(resp);
      if(resp.success){
        setOrderList(resp.data);
      }
    };

    

    fetchdata();
  }, []);

  const handleCardClick = (orderId, customer_id) => {
    setSelectedOrderId(orderId);

    dispatch(CompletedOrder({ customerId: customer_id, orderid: orderId }));
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
              token = {token}
              order_id={item.orderid}
              isSelected={selectedOrderId === item.orderid}
              price={item.total_amount}
              create_by  = {item.customer_id}
              handleClick={() =>
                handleCardClick(item.orderid, item.customer_id)
              }
            />
          ))}
    </div>
  );
}
