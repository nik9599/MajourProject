import React, { useState } from "react";
import "./dropdown.css";

export default function DropDown({selected,setSelected}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropDown">
      <div className="dropdown-button" onClick={(e)=>{setIsActive(!isActive)}} >
        {" "}
        { selected?selected: "Choose One"} <i class="fa-solid fa-caret-down"></i>{" "}
      </div>
      {isActive && (
        <div className="dropdown-content" onClick={(e)=>{setIsActive(!isActive)}} >
          <div onClick={()=>{setSelected("DinIn") }}  className="dropdown-item">Din In</div>
          <div  onClick={()=>{setSelected("TakeAway")}} className="dropdown-item"> Take Away </div>
        </div>
      )}
    </div>
  );
}
