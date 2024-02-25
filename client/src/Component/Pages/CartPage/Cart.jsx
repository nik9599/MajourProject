import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../cartItemCard/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);

  useEffect(() => {
    setCartItem(cartObservabel.getData());
    console.log(cartitem);
  }, []);

  console.log(cartitem);
  let temp = 0;
  cartitem.map((item) => {
    temp = temp + Number(item.product_price);
    console.log(temp);
  });

  return (
    <div className="C">
      <div className="CT">
        <div className="CT-1">Applcation name</div>
        <div className="CT-2">
          <div className="CT2-1">
            <Link to={"/"}>
              {" "}
              <button className="CT2-B">Home </button>
            </Link>{" "}
          </div>
          <div className="CT2-2"></div>
          <div className="CT2-3">
            {" "}
            <button>Login</button>{" "}
          </div>
        </div>
      </div>
      <div className="CB">    
        <div className="CB-R">
          <div className="CB-R1">
            <div className="CB-R1-1" >
              <p>Your Cart</p>
            </div>
            <div className="CB-R1-2" >
              {" "}
              <button>Clear All</button>{" "}
            </div>
          </div>
          <div className="CB-R2">
            {cartitem.map((item) => {
              return (
                <div>
                  <CartItem
                    product_image={item.product_image}
                    product_name={item.product_name}
                    product_price={item.product_price}
                    product_id={item.product_id}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="CB-L">your total</div>
   
      </div>
      <div className="CF">
    
          <div className="CF-1">
            {" "}
            <p>PLease Enter the location</p>{" "}
          </div>
          <div className="CF-2"></div>
          <div className="CF-3">
            {" "}
            <button>Select Location</button>{" "}
          </div>
       
      </div>
    </div>
  );
}
