import React, { useState, useEffect } from 'react';
import "./mainPage.css";
import Landing from '../LandingPage/Landing';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const [landing, setLanding] = useState(false);

  const newOrder = useSelector(state => state.state.New);
  const Order = useSelector(state => state.state.Orders);

  useEffect(() => {
    // Update the landing state based on the newOrder value
    setLanding(newOrder.state);
    
    console.log(`New Order ${newOrder.state}`)
    console.log(` Order ${Order.state}`);;
    console.log(` landing State ${landing.state}`);
  
  }, [newOrder,Order,landing]); // Only re-run the effect if newOrder changes

  

  return (
    <div>
      {landing && <Landing/>}
       
    </div>
  );
}

