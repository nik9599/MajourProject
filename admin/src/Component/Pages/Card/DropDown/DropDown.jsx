import React, { useState } from "react";
import "./dropdown.css";

export default function DropDown({selected,setSelected}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropDown">
       {isActive && (
        <div className="dropdown-content" onClick={(e)=>{setIsActive(!isActive)}} >
          <div onClick={()=>{setSelected("Cash") }}  className="dropdown-item">Cash</div>
          <div  onClick={()=>{setSelected("Online")}} className="dropdown-item"> Online  </div>
        </div>
      )}
      <div className="dropdown-button" onClick={(e)=>{setIsActive(!isActive)}} >
        {" "}
        { selected?selected: "Payment Mode"} {isActive?<i class="fa-solid fa-caret-up"></i>:<i class="fa-solid fa-caret-down"></i>}{" "}
      </div>
     
    </div>
  );
}
