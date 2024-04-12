import React from "react";
import "./cartItem.css";
import vegIcon from "../../Image/veg-icon.png";
import NoVegLogo from "../../Image/NoVegLogo.jpeg";
import Button from "../ButtonPage/Button.jsx";

export default function CartItem({
  product_name,
  product_price,
  product_image,
  product_id,
  setUpdate,
  isVeged,
}) {
  return (
    <div className="CI">
      <div className="CI-1">
        {" "}
        <img src={product_image} alt="product " />{" "}
      </div>
      <div className="CI-2">
        {" "}
        <div className="CI2-1">
          <p>{product_name} </p>
          <p> {isVeged ? <img src={vegIcon} /> : <img src={NoVegLogo} />} </p>
        </div>
        <p>
          {" "}
          <i className="fa-solid fa-indian-rupee-sign"></i> {product_price}
        </p>{" "}
      </div>
      <div className="CI-3">
        <Button product_id={product_id} setUpdate={setUpdate} />
      </div>
    </div>
  );
}
