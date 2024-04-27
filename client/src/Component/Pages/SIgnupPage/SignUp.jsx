import React, { useEffect, useState } from "react";
import "./signUp.css";
import signUp from "./signup.js";
import "../LoginPages/login.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const signUpDataLayout = {
  username: "",
  password: "",
  email: "",
  mobile: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [signUpData, setSignUpData] = useState(signUpDataLayout);
  const [isError, setIsError] = useState(false);
  const [errorMessge, setErrorMessage] = useState("This is testing");
  const [UserName, setUserName] = useState("");
  const [userNameUnique, isUSerNameUnique] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerified, isEmailVerified] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState(false);
  const [mobile, setMobile] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const startTimer = setTimeout(async () => {
      isUSerNameUnique(await signUp.userNameUnique(UserName));
    }, 2000);

    return () => clearTimeout(startTimer);
  }, [UserName, userNameUnique]);

  useEffect(() => {
    const startTimer = setTimeout(async () => {
      isEmailVerified(await signUp.emailValidator(email));
    }, 3000);

    return () => clearTimeout(startTimer);
  }, [email]);

  useEffect(() => {
    const startTimer = setTimeout(async () => {
      setVerifiedPassword(await signUp.passwordValidator(password));
    }, 3000);

    return () => clearTimeout(startTimer);
  }, [password]);

  useEffect(() => {
    const startTimer = setTimeout(async () => {
      setCheckPassword(await signUp.confirmPassword(password, confirmPassword));
    }, 3000);

    return () => clearTimeout(startTimer);
  }, [confirmPassword]);

  const handelInput = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handelsignUp = async (e) => {
    e.preventDefault();

    const res = await signUp.registeredData(signUpData);

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
      <div className="signUp-bottom-container">
        <div className="signUp-text">Create an acount</div>
        <div className="signUp-form-container">
          <form className="signup-form" onSubmit={handelsignUp}>
            <label htmlFor="username">Username</label>
            <input
              style={{
                boxShadow: userNameUnique
                  ? "0 1px 5px 0.5px red"
                  : "0 2px 9px 1px lightgray",
                  color: userNameUnique
                  ? " red"
                  : "black",
              }}
              name="username"
              type="text"
              placeholder="hello"
              className="sigup-input"
              value={UserName}
              onChange={(e) => {
                setUserName(e.target.value);
                handelInput(e);
              }}
            />
            {userNameUnique && (
              <p style={{ fontSize: "10px", marginTop: "10px", color: "red" }}>
                Username already taken
              </p>
            )}
            <label htmlFor="email">Email</label>
            <input
              style={{
                boxShadow: emailVerified
                  ? "0 2px 9px 1px red"
                  : "0 2px 9px 1px lightgray",
              }}
              type="text"
              name="email"
              placeholder="exampel@gmail.com"
              className="sigup-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handelInput(e);
              }}
            />
            {emailVerified && (
              <p style={{ fontSize: "10px", marginTop: "10px", color: "red" }}>
                Already in use
              </p>
            )}
            <label htmlFor="mobile">Mobile</label>
            <input
              type="number"
              name="mobile"
              placeholder="+91"
              className="sigup-input"
              onChange={(e) => {
                setMobile(e.target.value);
                handelInput(e);
              }}
              value={mobile}
            />
            <label htmlFor="password"> Password </label>
            <input
              style={{
                boxShadow: !verifiedPassword
                  ? "0 2px 9px 1px red"
                  : "0 2px 9px 1px lightgray",
              }}
              type="text"
              name="password"
              placeholder="Example@123"
              className="sigup-input"
              onChange={(e) => {
                setPassword(e.target.value);
                handelInput(e);
              }}
              value={password}
            />
            {!verifiedPassword && (
              <p style={{ fontSize: "10px", marginTop: "10px", color: "red" }}>
                Password is weak
              </p>
            )}
            <label htmlFor="password"> Confirm Password </label>
            <input
              style={{
                boxShadow: !checkPassword
                  ? "0 2px 9px 1px red"
                  : "0 2px 9px 1px lightgray",
              }}
              type="text"
              name="confirmPassword"
              placeholder="Example@123"
              className="sigup-input"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handelInput(e);
              }}
              value={confirmPassword}
            />
            {!checkPassword && (
              <p style={{ fontSize: "10px", marginTop: "10px", color: "red" }}>
                Password not match
              </p>
            )}

            {isError && (
              <div className="error-div">
                {" "}
                <p>{errorMessge}</p>{" "}
              </div>
            )}

            <button
              type={
                !userNameUnique &&
                !emailVerified &&
                verifiedPassword &&
                checkPassword
                  ? "submit"
                  : ""
              }
              style={{
                color:
                  !userNameUnique &&
                  !emailVerified &&
                  verifiedPassword &&
                  checkPassword
                    ? "black"
                    : "gray",
              }}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
