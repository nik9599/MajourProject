import React, { useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer";

export default function OrderList() {
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleCardClick = (orderId) => {
      setSelectedOrderId(orderId);
    };
  return (
    <div className="OrderList-container">
      {
            Array.from({ length: 5}).map((_, index) => (
              <OrderListShimmer key={index} />
              ))
      }
      
      {/* <OrderListCard
       order_id={1}
       isSelected={selectedOrderId === 1}
       handleClick={() => handleCardClick(1)}
       />
      <OrderListCard 
       order_id={2}
       isSelected={selectedOrderId === 2}
       handleClick={() => handleCardClick(2)}
      /> */}
      
    </div>
  );
}
