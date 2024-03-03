import React, { useRef, useState } from "react";
import "./location.css";
import location from "../../utils/CommonFunction/location.js";

export default function Location({ selectedlocation, setSelectedLocation }) {
  const [isActive, setActive] = useState(false);
  return (
    <div className="dropUp" onClick={(e)=>{setActive(!isActive)}} >
      {isActive && (
        <div className="dropUpMenu" >
          {location.map((item, index) => (
            <div className="dropUpItem"   onClick={()=>{setSelectedLocation(item) }}   key={index}>{item}</div>
          ))}
        </div>
      )}
      <div className="dropUpButton"  onClick={() => setActive(!isActive)}> Drop Poiont  :  { selectedlocation?selectedlocation: ""}</div>
    </div>
  );
}
