import React, { useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import "../LoginPages/login.css";
import { postRequest } from "../../API/API";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const signUpDataLayout = {
  username: "",
  password: "",
  email: "",
  mobile: "",
};

export default function SignUp() {
  const [signUpData, setSignUpData] = useState(signUpDataLayout);
  const [isError, setIsError] = useState(false);
  const [errorMessge, setErrorMessage] = useState("This is testing");

  const navigator = useNavigate();

  const handelInput = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handelsignUp = async (e) => {
    e.preventDefault();

    const res = await postRequest(signUpData, "/signUp");

    if (res.success) {
      setIsError(false);
      setErrorMessage("");
      navigator("/login");
    } else {
      setIsError(true);
      setErrorMessage(res.msg);
    }
  };

  return (
    <div className="signUp-container">
      <div className="signup-nav-container">
        <NavBar />
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
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
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
