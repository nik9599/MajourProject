import "./button.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";

import React from "react";

export default function Button({product_id}) {


    const increseQuantity =()=>{
        console.log("call");
        cartObservabel.updateTheQunatity(product_id)
      }
    
      const decreaseProperty = ()=>{
        console.log("decrease");
        cartObservabel.removeQuantity(product_id)
      }
    

  return (
    <div className="MC-I2-IB">
      <button className=" MC-I2-IB-P " onClick={increseQuantity}>
        +
      </button>
      <p className="MC-I2-IB-T">12</p>
      <button className="MC-I2-IB-D " onClick={decreaseProperty}>
        -
      </button>
    </div>
  );
}
