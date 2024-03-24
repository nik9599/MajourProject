import React from "react";
import "./profile.css";
import NavBar from "../NavBar/NavBar";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="profile-container">
        <div className="avatar-container">
          {" "}
          <div>
            <i class="fa-solid fa-user-astronaut"></i>
          </div>{" "}
          <div></div>{" "}
        </div>

        <div className="edit-button-container">
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
      <div className="order-history-container">
        <div className="Myorder-container">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </div>
        <div className="offer-container">
          {" "}
          <i class="fa-solid fa-bullhorn"></i>{" "}
        </div>
        <div className="setting container">
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>
      <div className="bottom-container">
        <div className="about-container">
          {" "}
          <i class="fa-solid fa-circle-info"></i>{" "}
        </div>
        <div className="logOut-container">
          {" "}
          <i class="fa-solid fa-right-from-bracket"></i>{" "}
        </div>
      </div>
    </div>
  );
}
