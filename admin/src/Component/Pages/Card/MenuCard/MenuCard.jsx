import React, { useState, useEffect, useMemo } from "react";
import "./MenuCard.css";
import vegIcon from "../../../Image/veg-icon.png";
import cartObservable from "../../../utils/CartObservabel/cartObservabel.js";
import Button from "../ButtonPage/Button.jsx";

export default function MenuCard({
  product_name,
  product_image,
  product_id,
  product_price,
  product_qantity,
  button_state
}) {
  const [changeView, setChangeView] = useState(false);

 
  const handleAddToCart = (
    product_name,
    product_image,
    product_id,
    product_price
  ) => {
    const item = {
      product_name: product_name,
      product_image: product_image,
      product_id: product_id,
      product_price: product_price,
      product_qantity :1,
    };
    
    cartObservable.addItem(item);
  };

  return (
    <div className="MC">
      <div className="MC-Inner">
        <div className="MC-I1">
          <div className="MC-I1-1">
            <p>{product_name || "2 Cheesy Italian Chicken + Fries(L)+2Coke"}</p>
          </div>
          <div className="MC-I1-2">
            <img src={vegIcon} />
          </div>
        </div>
        <div className="MC-I2">
          <div className="MC-I2-Image">
            <img src={product_image} />
          </div>
          <div className="MC-I2-Info">
            {" "}
           
            <p>Price</p>
            <p>
              {" "}
              <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
              {product_price || 512}
            </p>
            <div className="MC-I2-Info-Button">
              {changeView||button_state ? (
                <Button product_id={product_id} />
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(
                      product_name,
                      product_image,
                      product_id,
                      product_price
                    );
                    setChangeView(!changeView);
                  }}
                >
                  ADD +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
