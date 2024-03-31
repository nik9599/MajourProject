import React, { useState } from "react";
import "./inventoryCard.css";
import { putRequest , deletRequest } from "../../../API/API";

export default function InventoryCard({
  product_id ,
  product_name = "Sandwich",
  availabel_Quantity = 10,
  holdQyantity = 10,
  token,
}) {
  const [input, setInput] = useState({
    inventory: "",
  });

  const handelInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const addInventory = async (id) => {
    const data = {
      input: input.inventory,
      product_id: id,
    };

    const resp = await putRequest(data, "/updateInventory", token);

    console.log(resp);
  };


  const deletProduct = async(id) =>{
    const resp = await deletRequest( `/deletProduct/${id}` , token)
    console.log(resp);
    if(resp.success){
      window.location.reload();
    }
  }

  return (
    <div className="inv-card-container">
      <div className="space"> </div>
      <div className="inv-card-product-name">{product_name}</div>
      <div className="space"> </div>
      <div className="inv-card-availabel-quantity"> {availabel_Quantity} </div>
      <div className="space"> </div>
      <div className="inv-card-hold-quantity"> {holdQyantity} </div>
      <div className="space"> </div>
      <div className="inv-card-input">
        {" "}
        <input
          name="inventory"
          value={input.inventory}
          onChange={(e) => handelInput(e)}
        />{" "}
      </div>
      <div className="inv-card-button-add">
        {" "}
        <button
          onClick={() => {
            addInventory(product_id);
          }}
        >
          ADD
        </button>{" "}
      </div>

      {/* for fututre scope */}

      {/* <div className="space"> </div>
          <div className="inv-card-releas-button">
            {" "}
            <button>
              <i class="fa-solid fa-repeat"></i>
            </button>{" "}
          </div> */}

      {/* for fututre scope */}
      
      <div className="space"> </div>
      <div className="inv-card-remove-button" onClick={()=>{deletProduct(product_id)}} >
        {" "}
        <button>
          <i class="fa-solid fa-trash"></i>
        </button>{" "}
      </div>
    </div>
  );
}
