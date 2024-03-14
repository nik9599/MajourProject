import "./button.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import { getRequest } from "../../API/API.js";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";

export default function Button({ product_id, setUpdate = () => {} }) {
  // setting the localstate
  const [quantity, setQuantity] = useState(0);
  const [toggel, setToggel] = useState(false);
  const token = useSelector((state) => state.login.login.token);


  // fetching the quantity of product
  useEffect(() => {
    setQuantity(cartObservabel.getProductQuantityById(product_id));
  }, [product_id, toggel]);

  // function for increasing the quantity of product

  const increseQuantity = async () => {
    const resp = await getRequest(
      null,
      `/increseQuantity/${product_id}`,
      token
    );
    if (resp.success) {
      cartObservabel.updateTheQunatity(product_id);
      setUpdate((prevUpdate) => !prevUpdate);
      setToggel(!toggel);
    }
  };

  // function for decresing the quantity of product

  const decreaseProperty = async () => {
    const resp = await getRequest(
      null,
      `/decreaseQuantity/${product_id}`,
      token
    );
    if (resp.success) {
      cartObservabel.removeQuantity(product_id);
      setUpdate((prevUpdate) => !prevUpdate);
      if (quantity < 1) {
        window.location.reload();
      }
      setToggel(!toggel);
    }
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
