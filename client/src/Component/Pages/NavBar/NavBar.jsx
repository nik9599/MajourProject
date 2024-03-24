import "./navbar.css";
import DropDown from "../CartPage/DropDown";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [selected, setSelected] = useState("Din In");
  const [isCartpage, setCartPage] = useState(false);
  const [isLoginPage, setLoginPage] = useState(false);

  useEffect(() => {
    const page = window.location.pathname;
    if (page === "/cart") {
      setCartPage(true);
    } else if (page === "/login") {
      setCartPage(false);
      setLoginPage(true);
    }
  }, []);

  return (
    <div className="Navbar-container">
      <div className="CT">
        <div className="CT-1">
          <div className="CT1-1">
            {" "}
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Crave Cart{" "}
            </Link>{" "}
          </div>
          <div className="CT1-2">
            {isCartpage && (
              <DropDown selected={selected} setSelected={setSelected} />
            )}
          </div>
        </div>
        <div className="CT-2">
          <div className="CT2-1">
            <Link to={"/"}>
              {" "}
              <button className="CT2-B">Home </button>
            </Link>{" "}
          </div>
          <div className="CT2-2"></div>
          <div className="CT2-3">
            {" "}
            <Link to={isLoginPage ? "/signUp" : "/login"}>
              <button>{isLoginPage ? "Register" : "Login"}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
