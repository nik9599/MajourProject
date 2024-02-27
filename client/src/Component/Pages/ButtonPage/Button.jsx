import "./button.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Button({ product_id }) {
  const [quantity, setQuantity] = useState(0);
  const [toggel, setToggel] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    setQuantity(cartObservabel.getProductQuantityById(product_id));
  }, [product_id, toggel]);

  const increseQuantity = () => {
    cartObservabel.updateTheQunatity(product_id);
    setToggel(!toggel);
  };

  const decreaseProperty = () => {
    cartObservabel.removeQuantity(product_id);
    if (quantity === 0) {
     window.location.reload()
    }
    setToggel(!toggel);
  };

  return (
    <div className="MC-I2-IB">
      <button className=" MC-I2-IB-P " onClick={increseQuantity}>
        +
      </button>
      <p className="MC-I2-IB-T">{quantity}</p>
      <button className="MC-I2-IB-D " onClick={decreaseProperty}>
        -
      </button>
    </div>
  );
}
