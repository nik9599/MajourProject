import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../cartItemCard/CartItem";
import { Link } from "react-router-dom";
import { postRequest } from "../../API/API.js";
import Location from "../Location/Location";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { decreaseQuantityInDatabase } from "../../utils/CommonFunction/productUpdate.js";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedlocation, setSelectedLocation] = useState("");
  const isUserLoggedIn = useSelector((state) => state.login.login.isLogedIn);
  const userId = useSelector((state) => state.login.login.userId);
  const token = useSelector((state) => state.login.login.token);
  const navigate = useNavigate();

  //-----------------hook for fetchig all the user cart data----------------------

  useEffect(() => {
    setCartItem(cartObservabel.getData());

  }, []);

  //------------------fetching the total price-----------------------------------------
  useEffect(() => {
    setPrice(cartObservabel.getTheTotal());
  }, [update]);

  //--------------------hook for clearing all the data---------------------------
  const clearAll = async () => {
    const resp = await decreaseQuantityInDatabase(cartitem, token);
    console.log(resp);
    if (resp) {
      cartObservabel.removeAllItem();
      window.location.reload();
    }
  };

  //--------------------placingOrder------------------------------------------------
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
        const addOrder = {
          order_id: getOrderId.order_Id,
          product_id: productId,
          quantity: quantity,
          price_per_unit: price_per_Unit,
          total_price: cartObservabel.getTheTotal(),
        };

        const placeOrder = await postRequest(addOrder, "/addingItem", token);

        if (placeOrder.success) {
          navigate(`/payment/${getOrderId.order_Id}`);
        }
      }
    }
  };

  const screenWidth = window.screen.width;

  return (
    <div className="C">
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="CB">
        <div className="CB-R">
          <div className="CB-R1">
            <div className="CB-R1-1">
              <p>Your Cart</p>
            </div>
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
                <div>
                  <CartItem
                    key={item.product_id}
                    product_image={item.product_image}
                    product_name={item.product_name}
                    product_price={item.product_price}
                    product_id={item.product_id}
                    setUpdate={setUpdate}
                    isVeged={item.isveged}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {screenWidth >= 440 && (
          <div className="CB-L">
            <div className="CB-Total">Total Charges</div>
            <div className="CB-T-1">
              <div className="CB-1">
                <p>Total Payable</p>
                <p> {price} </p>
              </div>
              <div className="CB-2"> </div>
              <div className="CB-3">
                {" "}
                <div className="CB3-1">
                  <p>Sub Total</p>
                  <p> {price} </p>
                </div>
                <div className="CB3-2">
                  {" "}
                  <p>CGST</p>
                  <p>0</p>
                </div>
                <div className="CB3-3">
                  {" "}
                  <p>SGST</p>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="CF">
        <div className="CF-1">
          {selected == "TakeAway" && false && (
            <div className="CF1-1">
              <div className="CF1-2">
                <Location
                  selectedlocation={selectedlocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            </div>
          )}
        </div>
        <div className="CF-2">
          <div className="CF-3">
            {" "}
            <button onClick={isUserLoggedIn ? placeorder : undefined}>
              {isUserLoggedIn && price > 0 ? (
                <Link style={{ textDecoration: "none", color: "black" }}>
                  Pay {price}
                </Link>
              ) : (
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              )}
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
