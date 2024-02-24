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
            <Link  to={"/"}>
              {" "}
              <button className="CT2-B" >Home </button>
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
        <div className="CB-R"></div>
        <div className="CB-L">
          {cartitem.map((item) => {
            return (
              <div>
                <CartItem
                  product_image={item.product_image}
                  product_name={item.product_name}
                  product_price={item.product_price}
                />
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
      <div className="CF"></div>
    </div>
  );
}
