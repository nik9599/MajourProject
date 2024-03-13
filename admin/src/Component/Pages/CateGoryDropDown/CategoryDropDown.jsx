import React , {useState} from "react";
import "./categoryDropDown.css";
import category from "../../utils/common/category.js";

export default function CategoryDropDown({ setSelected, selected }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropDown">
      
      {isActive && (
        <div
          className="Dropdown-content"
          onClick={(e) => {
            setIsActive(!isActive);
          }}
        >
          {category.map((item,i) => (

            <div
            key={i}
              onClick={() => {
                setSelected(item.category);
              }}
              className="Dropdown-item"
            >
              {item.category}
            </div>
          ))}
        </div>
      )}
 
      <div
        className="Dropdown-button"
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {" "}
        {selected ? selected : "Category"}{" "}
        {isActive ? (
          <i className="fa-solid fa-caret-down"></i>
        ) : (
          <i className="fa-solid fa-caret-up"></i>
        )}{" "}
      </div>
    </div>
  );
}
