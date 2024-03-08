import React, { useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import "../LoginPages/login.css";


const signUpDataLayout = {
  username: "",
  password: "",
  email: "",
};

export default function SignUp() {
  const [signUpData, setSignUpData] = useState(signUpDataLayout);
  const [isError, setIsError] = useState(false);
  const [errorMessge, setErrorMessage] = useState("This is testing");
   

  const handelInput = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handelsignUp = () => {
    alert(` email : ${signUpData.email} password : ${signUpData.password}`);
   
  };

  return (
    <div className="signUp-container">
      <div className="signup-nav-container">
        <div className="nav-logo">
          <div className="logo-div">
            {" "}
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
            <Link to="/login" className="custom-link">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="signUp-form-container">
        <form className="signup-form" onSubmit={handelsignUp}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="hello"
            className="sigup-input"
            value={signUpData.username}
            onChange={(e) => handelInput(e)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="exampel@gmail.com"
            className="sigup-input"
            onChange={(e) => handelInput(e)}
          />
          <label htmlFor="password"> Password </label>
          <input
            type="text"
            name="password"
            placeholder="Example@123"
            className="sigup-input"
            onChange={(e) => handelInput(e)}
          />

          {isError && (
            <div className="error-div">
              {" "}
              <p>{errorMessge}</p>{" "}
            </div>
          )}

          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}
