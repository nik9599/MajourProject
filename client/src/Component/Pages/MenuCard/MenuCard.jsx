import React, { useState, useEffect, useMemo } from "react";
import "./MenuCard.css";
import vegIcon from "../../Image/veg-icon.png";
import NoVegLogo from "../../Image/NoVegLogo.jpeg"
import cartObservable from "../../utils/CartObservabel/cartObservabel.js";
import Button from "../ButtonPage/Button.jsx";
import { useSelector } from "react-redux";
import { getRequest } from "../../API/API.js";

export default function MenuCard({
  product_name,
  product_image,
  product_id,
  product_price,
  product_qantity,
  isveged,
  button_state,
}) {
  const [changeView, setChangeView] = useState(false);
  const isuserLogin = useSelector((state) => state.login.login.isLogedIn);
  const token = useSelector((state) => state.login.login.token);

  const handleAddToCart = async (
    product_name,
    product_image,
    product_id,
    product_price,
    isveged
  ) => {
    const item = {
      product_name: product_name,
      product_image: product_image,
      product_id: product_id,
      product_price: product_price,
      product_qantity: 1,
      product_add_new:true,
      isveged:isveged
    };
    const resp = await getRequest(undefined,
      `/increseQuantity/${product_id}`,  token
    );
    console.log(resp);
    if (resp.success) {
      setChangeView(!changeView);
      cartObservable.addItem(item ,token);
    } else {
      alert("Your session expierd");
      window.sessionStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="MC">
      <div className="MC-Inner">
        <div className="MC-I1">
          <div className="MC-I1-1">
            <p>{product_name || "2 Cheesy Italian Chicken + Fries(L)+2Coke"}</p>
          </div>
          <div className="MC-I1-2">{isveged ? <img src={vegIcon} /> : <img src={NoVegLogo} /> }</div>
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
              {product_qantity <= 0 ? (
                <p style={{ marginTop: "40px", color: "red" }}>Out of stock</p>
              ) : isuserLogin && (changeView || button_state) ? (
                <Button product_id={product_id} />
              ) : (
                <button
                  onClick={() => {
                    if (isuserLogin) {
                      handleAddToCart(
                        product_name,
                        product_image,
                        product_id,
                        product_price,
                        isveged
                      );
                     
                    } else {
                      alert("Please log in to add to cart");
                    }
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
