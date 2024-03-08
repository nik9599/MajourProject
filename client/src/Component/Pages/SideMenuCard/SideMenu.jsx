import React from "react";
import "./SideMenu.css";

export default function SideMenu({ items, categorySearch }) {
  const handelSearch = (items) => {
    categorySearch(items);
  };

  return (
    <div className="SM" onClick={() => handelSearch(items)}>
      <p>{items}</p>
    </div>
  );
}
