import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../Card/cartItemCard/CartItem";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";
import { postRequest } from "../../API/API.js";

import { useSelector } from "react-redux";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [oderId , setOderId]  = useState() 
  const [update, setUpdate] = useState(false);
  const [payment, setPayment] = useState(false);
  const token = useSelector((state) => state.login.login.token);
  const userId = useSelector((state) => state.login.login.userId);

  //-----------------hook for fetchig all the user cart data----------------------

  useEffect(() => {
    setCartItem(cartObservabel.getData());
  }, []);

  //------------------fetching the total-----------------------------------------
  useEffect(() => {
    setPrice(cartObservabel.getTheTotal());
  }, [update]);

  //--------------------hook for clearing all the data---------------------------
  const clearAll = () => {
    cartObservabel.removeAllItem();
    window.location.reload();
  };

  //---------------------------funcation for placing order----------------------------

  const placeorder = async (e) => {
    if (price == 0) {
      alert("your cart is empty");
    } else {
      const orderIdData = {
        customer_id: userId,
        total_amount: price,
        status: "pending",
      };

      const getOrderId = await postRequest(orderIdData, "/order", token);

      if (getOrderId.success) {
        const quantity = await cartObservabel.getQuantity();
        const productId = await cartObservabel.getProductIds();
        const price_per_Unit = await cartObservabel.getPerUnitPrice();
        setOderId(getOrderId.order_Id);
        const addOrder = {
          order_id: getOrderId.order_Id,
          product_id: productId,
          quantity: quantity,
          price_per_unit: price_per_Unit,
          total_price: cartObservabel.getTheTotal(),
        };

        console.log(addOrder);

        const placeOrder = await postRequest(addOrder, "/addingItem", token);

        if (placeOrder.success) {
        
          setPayment(!payment);
        }
      }
    }
  };


  return (
    <div className="C">
      {payment ? (
        // making api call before this
        
        <Payment cartItem={cartitem} total={price} oderId={oderId} />
      ) : (
        <div className="CB-R">
          <div className="CB-R1">
            <div className="CB-R1-2">
              {" "}
              <button onClick={clearAll}>Clear All</button>{" "}
            </div>
          </div>
          <div className="CB-R2">
            {cartitem.length == 0 && (
              <div className="Empty">
                <h1>There is Nothing</h1>
              </div>
            )}
            {cartitem.map((item) => {
              return (
                <div key={item.product_id}>
                  <CartItem
                    product_image={item.product_image}
                    product_name={item.product_name}
                    product_price={item.product_price}
                    product_id={item.product_id}
                    setUpdate={setUpdate}
                  />
                </div>
              );
            })}
          </div>
          <div className="CF">
            <div className="CF-2">
              <div className="CF-3">
                {" "}
                <button onClick={() => placeorder()}>Pay {price}</button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
