import React from "react";
import "./profile.css";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../utils/Redux/login/loginSlice";

export default function Profile() {
  const navigator = useNavigate();
  const dispatch= useDispatch();
  const logout = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
     dispatch(logOutUser())
    navigator('/')
  };

  return (
    <div className="profile-Main-container">
      <div className="navbar-container">
        <NavBar />
      </div>
      <div className="Bottom-Container-Profile">
        <div className="profile-container">
          <div className="avatar-container">
            {" "}
            <div className="avatar">
              <i className="fa-solid fa-user-astronaut fa-xl "></i>
            </div>{" "}
            <div className="Username-container">
              {" "}
              <p> UserName</p> <p>contact</p>
            </div>{" "}
          </div>

          <div className="edit-button-container">
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div className="order-history-container">
          <Link
            to={"/previousOrder"}
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            <div className="Myorder-container">
              <i className="fa-solid fa-clock-rotate-left fa-xl "></i>
              <p>Previous Order</p>
            </div>
          </Link>
          <div className="offer-container">
            {" "}
            <i className="fa-solid fa-bullhorn fa-xl "></i> <p>Offer</p>
          </div>
          <div className="setting-container">
            <i className="fa-solid fa-gear"></i>
            <p>Setting</p>
          </div>
        </div>
        <div className="bottom-container">
          <div className="about-container">
            {" "}
            <i className="fa-solid fa-circle-info"></i> <p>About</p>
          </div>
          <div
            className="logOut-container"
            onClick={() => {
              logout();
            }}
          >
            {" "}
            <i className="fa-solid fa-right-from-bracket"></i> <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
