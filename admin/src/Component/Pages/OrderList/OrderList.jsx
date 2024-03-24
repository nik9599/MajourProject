import React, { useEffect, useState } from "react";
import OrderListCard from "../Card/OrderListCard/OrderListCard";
import { useSelector  , useDispatch} from "react-redux";
import {OrdeerDetail} from "../../utils/Redux/slice/stateSlice/stateSlice.js"
import "./orderList.css";
import OrderListShimmer from "../ShimmerCard/OrderListShimmer/OrderListShimmer";
import {io} from "socket.io-client";

// making connection witrh socket-server

const socket = io.connect("http://localhost:8080");

export default function OrderList() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const token = useSelector((state) => state.login.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // Emit event to request new order data
      socket.emit("getnewOrder", async (response) => {
        // Handle response
        console.log('Response from getnewOrder:', response);
        // You might want to process the response if needed
      });
  
      // Listen for active order data from the server
      socket.on("activeOrderData", async (response) => {
        // Handle response
        console.log('Response from activeOrderData:', response);
        setOrderList(response.data); // Set order list based on response
      });
    };
  
    fetchData(); // Call the fetchData function to execute the event emissions and event handling logic
    
    // Clean up the event listener when component unmounts
    return () => {
      socket.off("activeOrderData");
    };
  }, [token]); // Ensure dependencies are included in the dependency array
  
  // Use useEffect to log the current state of orderList whenever it changes
  useEffect(() => {
    console.log('Current orderList:', orderList);
  }, [orderList]);
 
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
