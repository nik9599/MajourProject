import React, { useState, useEffect } from 'react';
import "./mainPage.css";
import Landing from '../LandingPage/Landing';
import { useSelector } from 'react-redux';
import OrderDetail from '../OrderDetail/OrderDetail';
import Completed from "../OrderCompleted/Completed.jsx"
import CompletedOrderDetail from '../CompletedOrderDetail/CompletedOrderDetail.jsx';

export default function MainPage() {
  const [landing, setLanding] = useState(false);

  const newOrder = useSelector(state => state.state.New);
  const Order = useSelector(state => state.state.Orders);
  const orderDetail = useSelector(state =>state.state.OrderDetail);
  const OrderCompleted = useSelector(state => state.state.Completed);

  useEffect(() => {
    // Update the landing state based on the newOrder value
    setLanding(newOrder.state);

  }, [newOrder,Order,landing]); // Only re-run the effect if newOrder changes

  

  return (
    <div  >
      {landing && <Landing/>}
       {Order.state && <OrderDetail/>}
       {orderDetail.state && <OrderDetail order_id ={orderDetail.orderid} customer_id ={orderDetail.customerId} />}
       {OrderCompleted.state && <CompletedOrderDetail/>}
       {orderDetail.state && <CompletedOrderDetail  />}
    </div>
  );
}

