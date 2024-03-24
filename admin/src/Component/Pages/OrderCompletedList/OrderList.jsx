import React, { useEffect, useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import { useSelector  , useDispatch} from "react-redux";
import {OrdeerDetail} from "../../utils/Redux/slice/stateSlice/stateSlice.js"
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer";



const socket = io.connect("http://localhost:8080");

export default function OrderList() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const dispatch = useDispatch();

  useEffect(()=>{
  
  },[])
 
  const handleCardClick = (orderId , customer_id) => {

    setSelectedOrderId(orderId);

    dispatch(OrdeerDetail({customerId : customer_id ,orderid: orderId}))
  };
  return (
    <div className="OrderList-container">
      {orderList.length == 0 ? (
        Array.from({ length: 5 }).map((_, index) => (
          <OrderListShimmer key={index} />
        ))
      ) : (
        orderList.map((item , index)=>(
        <OrderListCard
           key={index}
          order_id={item.orderid}
          isSelected={selectedOrderId === item.orderid}
          price = {item.total_amount}
          handleClick={() => handleCardClick(item.orderid , item.customer_id)}
        />))
        
      )}
    </div>
  );
}
