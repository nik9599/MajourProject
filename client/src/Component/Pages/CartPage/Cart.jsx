import React, { useEffect, useState } from "react";
import "./cart.css";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import CartItem from "../cartItemCard/CartItem";
import { Link } from "react-router-dom";
import { postRequest, getRequest, putRequest } from "../../API/API.js";
import Location from "../Location/Location";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { decreaseQuantityInDatabase } from "../../utils/CommonFunction/productUpdate.js";
import OrderCard from "../OrderCard/OrderCard.jsx";
import formatDate from "../../utils/CommonFunction/dateFormate.js";

export default function Cart() {
  const [cartitem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [update, setUpdate] = useState(false);
  const [approvedOrder, setApprovedOrder] = useState([]);
  const [selected, setSelected] = useState("");
  const [selectedlocation, setSelectedLocation] = useState("");
  const isUserLoggedIn = useSelector((state) => state.login.login.isLogedIn);
  const userId = useSelector((state) => state.login.login.userId);
  const token = useSelector((state) => state.login.login.token);
  const navigate = useNavigate();

  //------------------funcation for fetchin any pending or approved order-------------------

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getRequest(
        null,
        `/userOrder/pending/${userId}`,
        token
      );
      console.log(resp.data);
      if (resp.success) {
        setApprovedOrder(resp.data);
      }
    };
    fetchData();
  }, []);

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
    const pendingOrder = await getRequest(
      null,
      `/pendingOrder/${userId}`,
      token
    );
    console.log(pendingOrder);
    if (pendingOrder.success && pendingOrder.data.length > 0) {
      const orderIdData = {
        oderId: pendingOrder.data[0].orderid,
        customer_id: userId,
        total_amount: price,
        status: "pending",
        payment_mode : "Online"
      };
      console.log(orderIdData);
      const updateOrder = await putRequest(orderIdData , "/updateOrder" , token );

      if(updateOrder.success){
        const data = await cartObservabel.getAllTheNewProduct();
        const newQuantity = data.map(item=>{
          return item.product_qantity
        })
        const productId = data.map(item=>{
          return item.product_id
          
        })
        const pricePerUnit = data.map(item=>{
          return item.product_price

        })

        const newData = {
          order_id: pendingOrder.data[0].orderid,
            product_id: productId,
            quantity: newQuantity,
            price_per_unit: pricePerUnit,
            total_price: cartObservabel.getTheTotal(),
        }

        const placeOrder = await postRequest(newData, "/addingItem", token);

        if(placeOrder.success){
          navigate(`/payment/${pendingOrder.data[0].orderid}`);
        }
      }

    } else {
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
            const data = cartObservabel.setAllProductAdd();
            if (data) {
              navigate(`/payment/${getOrderId.order_Id}`);
            }
          }
        }
      }
    }
  };

  const screenWidth = window.screen.width;

  //------------------------------------------funcation for handling pending order-----------------------------

  const handelNavigation = async (status, order) => {
    console.log(order);
    if (status == "pending") {
      const orderId = order.orderid;
      const resp = await getRequest(null, `/orderItem/${orderId}`, token);
      console.log(resp);
      if (resp.success) {
      }
    }
  };

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

          {approvedOrder && (
            <div className="approvedOrderContainer">
              {approvedOrder.map((order, i) => (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    handelNavigation(order.status, order);
                  }}
                >
                  <OrderCard
                    key={i}
                    orderAmount={order.total_amount}
                    orderData={formatDate(order.order_date)}
                    orderId={order.orderid}
                    orderStatus={order.status}
                  />
                </div>
              ))}
            </div>
          )}
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
