import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../Card/cartItemCard/CartItem";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";

// import { useSelector } from "react-redux";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [update, setUpdate] = useState(false);
  const [payment, setPayment] = useState(false);
  // const [selected, setSelected] = useState("");
  // const [selectedlocation, setSelectedLocation] = useState("");
  // const isUserLoggedIn = useSelector((state) => state.login.login.isLogedIn);

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

  return (
    <div className="C">
      {payment ? (
        // making api call before this
        <Payment  cartItem={cartitem} total={price} />
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
                <button onClick={() => setPayment(!payment)}>
                  Pay ${price}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
