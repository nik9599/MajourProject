import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../cartItemCard/CartItem";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import Location from "../Location/Location";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedlocation, setSelectedLocation ] = useState("")

  useEffect(() => {
    setCartItem(cartObservabel.getData());
  }, []);

  useEffect(() => {
    setPrice(cartObservabel.getTheTotal());
  }, [update]);

  const clearAll = () => {
    cartObservabel.removeAllItem();
    window.location.reload();
  };

  const screenWidth = window.screen.width;
  // console.log(screenWidth)

  return (
    <div className="C">
      <div className="CT">
        <div className="CT-1">
          <div className="CT1-1">Crave Cart</div>
          <div className="CT1-2">
            <DropDown selected={selected} setSelected={setSelected} />
          </div>
        </div>
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
            <div className="CB-R1-1">
              <p>Your Cart</p>
            </div>
            <div className="CB-R1-2">
              {" "}
              <button onClick={clearAll}>Clear All</button>{" "}
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
                    setUpdate={setUpdate}
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
        <div className="CF-1" >
        {selected == "TakeAway" && (
          <div className="CF1-1">
            <div className="CF1-2">
              <Location selectedlocation={selectedlocation} setSelectedLocation={setSelectedLocation}  />
            </div>
          </div>
        )}
        </div>
          <div className="CF-2">
            <div className="CF-3">
              {" "}
              <button> Pay {price}</button>{" "}
            </div>
          </div>
        
      </div>
    </div>
  );
}
