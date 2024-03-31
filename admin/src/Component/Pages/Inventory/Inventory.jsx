import React, { useEffect } from "react";
import "./inventory.css";
import SidenavBar from "../SideNavBar/SidenavBar";
import InventoryCard from "../Card/InventoryCard/InventoryCard";
import { getRequest } from "../../API/API.js";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Inventory() {
  const token = useSelector((state) => state.login.login.token);
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      const resp = await getRequest(null, "/getTheInventory", token);
      console.log(resp);
      if (resp.success) {
        setInventoryList(resp.data);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="inv-container">
      <div className="sidenavbar-container">
        <SidenavBar />
      </div>
      <div className="inv-main-container">
        <div className="inv-header-container">
          <div className="space"></div>
          <div className="inv-product-name">Product Name</div>
          <div className="space"></div>
          <div className="inv-availabel-quantity"> Availabel Quantity </div>
          <div className="space"></div>
          <div className="inv-hold-quantity"> Hold Quantity </div>
          <div className="space"></div>
          <div className="inv-add-quantity"> Add Quantity </div>
          <div className="space"></div>

          {/* for fututre scope */}
          {/* <div className="inv-add-quantity"> Releas Hold Quantity </div> */}
          {/* for fututre scope */}
          
          <div className="inv-add-quantity"> Remove Product </div>
        </div>
        <div className="inve-card-container">
          {inventoryList.map((item) => (
            <InventoryCard
              key={item.product_id}
              product_id={item.product_id}
              product_name={item.product_name}
              availabel_Quantity={item.availabel_quantity}
              holdQyantity={item.hold_quantity}
              token ={token}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
