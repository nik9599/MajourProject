import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../utils/Redux/login/loginSlice";
import { getRequest } from "../../API/API.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";

const LoginData = {
  email: "",
  password: "",
};

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [errorMessge, setErrorMessage] = useState("This is testing");
  const [loginData, setLoginData] = useState(LoginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //---------------------------function for handling inpuit----------------------------
  const handelInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //---------------------------------function for making store user data-----------------
  const handelLogin = async (e) => {
    e.preventDefault();
    const url =
      "/login" +
      `/${loginData.email || "null"}` +
      `/${loginData.password || "null"}`;
    const resp = await getRequest(null, url);

    if (resp.success) {
      setIsError(false);
      dispatch(
        LoginUser({
          username: resp.username,
          token: resp.token,
          isLogedIn: true,
          userId: resp.userId,
        })
      );
      navigate("/");
    } else {
      setIsError(true);
      setErrorMessage(resp.msg);
    }
  };

  return (
    <div className="login-container">
      <div className="signup-nav-container">
        <NavBar />
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
