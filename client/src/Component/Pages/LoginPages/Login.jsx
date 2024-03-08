import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../utils/Redux/login/loginSlice";

const LoginData = {
  email: "",
  password: "",
};

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [errorMessge, setErrorMessage] = useState("This is testing");
  const [loginData, setLoginData] = useState(LoginData);
  const dispatch = useDispatch();

  //---------------------------function for handling inpuit----------------------------
  const handelInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //---------------------------------function for making store user data-----------------
  const handelLogin = (e) => {
    e.preventDefault()
    alert(` email : ${loginData.email} password : ${loginData.password}`);
    dispatch(LoginUser({ username: "nikhil" }));
  };

  return (
    <div className="login-container">
      <div className="signup-nav-container">
        <div className="nav-logo">
          <div className="logo-div">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              {" "}
              Crave Cart{" "}
            </Link>
          </div>
        </div>
        <div className="nav-button">
          <div className="home-button">
            <Link className="custom-link" to={"/"}>
              {" "}
              <button>Home </button>
            </Link>{" "}
          </div>
          <div className="nav-divider"></div>
          <div className="register-link">
            {" "}
            <Link to="/signUp" className="custom-link">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="login-div">
        <form className="login-form" onSubmit={handelLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="exampel@gmail.com"
            className="form-input"
            value={loginData.email}
            onChange={(e) => {
              handelInput(e);
            }}
          />
          <label htmlFor="password"> Password </label>
          <input
            type="text"
            name="password"
            placeholder="Example@123"
            className="form-input"
            value={loginData.password}
            onChange={(e) => {
              handelInput(e);
            }}
          />
          {isError && (
            <div className="error-div">
              {" "}
              <p>{errorMessge}</p>{" "}
            </div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
