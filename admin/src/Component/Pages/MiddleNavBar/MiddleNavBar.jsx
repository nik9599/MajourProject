import React from "react";
import "./middleNavBar.css";

export default function MiddleNavBar() {
  return (
    <div className="middle-nav-container">
      <div className="upper-container">
        <div className="task-div">
          <p>Task List</p>
        </div>
        <div className="logo-div">
          {" "}
          <i class="fa-solid fa-list-check"></i>{" "}
        </div>
      </div>
      <div className="middle-contianer">
        <div className="new-div" tabIndex="0">
          {" "}
          <p>New</p>{" "}
        </div>
        <div className="orders-div" tabIndex="0">
          {" "}
          <p>Orders</p>{" "}
        </div>
        <div className="completed-div" tabIndex="0">
          <p>Completed</p>
        </div>
      </div>
      <div className="lower-container">
        
      </div>
    </div>
  );
}
