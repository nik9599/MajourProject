import React, { useCallback, useEffect, useState } from "react";
import MenuCard from "../MenuCard/MenuCard.jsx";
import { getRequest } from "../../API/API.js";
import "./Landing.css";
import category from "../../utils/CommonFunction/category.js";
import SideMenu from "../SideMenuCard/SideMenu.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShimmerCard from "../ShimmerCard/MenuShimmer/ShimmerCard.jsx";
import { getExpireTime } from "../../utils/CommonFunction/gettingSessionExpireTime.js";
import { decreaseQuantityInDatabase } from "../../utils/CommonFunction/productUpdate.js";

export default function Landing() {
  const [cartSize, setCartSize] = useState(0);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [menu, setMenu] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [activeId, setActiveId] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const name = useSelector((state) => state.login.login.username);
  const token = useSelector((state) => state.login.login.token);

  //----------------------fetching data from DB ------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getRequest(null, "/getAllProduct");

        if (resp.success) {
          setSampleData(resp.data);
          setMenu(resp.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //--------------------- fetching the size of cart---------------------------------------------

    const subscription = cartObservabel.getAllItems().subscribe((items) => {
      setCartSize(cartObservabel.getTheSizeOfCartItem());
    });

    fetchData();
    getExpireTime();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

//------------------------------Timer funcation for cleaning cart in given set of time--------------------
  useEffect(() => {
    if (cartSize > 0) {
      // Calculate the remaining time or use the stored remaining time
      let timeLeft = remainingTime > 0 ? remainingTime : 10 * 60 * 1000; // 1 minute in milliseconds
  
      // Convert milliseconds to minutes and seconds
      const minutes = Math.floor(timeLeft / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      console.log(`Remaining time: ${minutes} minutes ${seconds} seconds`);
  
      const timerId = setTimeout(async () => {
        // Your action when the timer expires
        console.log('Timer expired');
        await decreaseQuantityInDatabase(cartObservabel.getData(), token);
        // Reset the cart or perform any other action
        window.location.reload(); // Example of resetting the cart by reloading the page
  
        // Reset the remaining time
        setRemainingTime(0);
      }, timeLeft);
  
      // Update the remaining time when the component unmounts or when cartSize changes
      return () => clearTimeout(timerId);
    }
  }, [cartSize, remainingTime]);
  

  //------------------------fetching all the active Id----------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cartObservabel.getProductId();
        setActiveId(data);
      } catch (error) {
        console.error("Error fetching product IDs:", error);
      }
    };

    fetchData();
  }, []);

  //----------------------sorting search---------------------------------------------------------

  useEffect(() => {
    if (!sampleData) return;
    let filteredMenu = sampleData;

    if (veg) {
      filteredMenu = filteredMenu.filter((item) => item.isveged === true);
    } else if (nonVeg) {
      filteredMenu = filteredMenu.filter((item) => item.isnonveged === true);
    }

    setMenu(filteredMenu);
  }, [sampleData, veg, nonVeg]);

  //------------------------function for Searching-------------------------------------------------

  const handleSearch = useCallback(
    (e) => {
      const search = e.target.value.toLowerCase();
      const filteredMenu = sampleData.filter((item) =>
        item.product_name.toLowerCase().includes(search)
      );

      setMenu(filteredMenu);
    },
    [sampleData, setMenu]
  );

  //-----------------------function for search on the base of category------------------------------

  const categorySearch = useCallback(
    (search) => {
      const filteredMenu = sampleData.filter(
        (item) => item.category === search
      );
      setMenu(filteredMenu);
    },
    [sampleData, setMenu]
  );

  return (
    <div className="LM">
      <div className="LM1">
        <div className="LM1-T">
          <div className="LM1-T1">
            <h1>Crave Cart</h1>
          </div>

          <div className="User-Div">
            <Link
              to={name ? "/profile" : "/login"}
              style={{ textDecoration: "none" }}
            >
              <button className="User-Button">
                <i className="fa-regular fa-user"></i>
                <p>{name || "Login"}</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="LM1-B">
          <div
            className="LM1-B1"
            onClick={() => {
              setVeg(!veg);
            }}
          >
            <p>
              Veg
              {veg && (
                <div className="VS">
                  {" "}
                  <i className="fa-solid fa-xmark S"></i>{" "}
                </div>
              )}
            </p>
          </div>
          <div
            className="LM1-B2"
            onClick={() => {
              setNonVeg(!nonVeg);
            }}
          >
            {" "}
            <p>
              NonVeg
              {nonVeg && (
                <div className="VS">
                  {" "}
                  <i className="fa-solid fa-xmark S"></i>{" "}
                </div>
              )}
            </p>{" "}
          </div>

          <div className="LM1-B3">
            <button>
              <Link to={"/cart"}>
                {" "}
                <i className="fa-solid fa-cart-shopping fa-2xl A "></i>
                <p className="size">{cartSize}</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="LM2">
        <div className="LM2-Left">
          {category.map((item) => {
            return (
              <div key={item.id}>
                <SideMenu
                  items={item.category}
                  categorySearch={categorySearch}
                />
              </div>
            );
          })}
        </div>
        <div className="LM2-Mid">
          <div className="LM2-M1">
            {" "}
            <p> Check This </p>
            <div className="LM2-T2">
              <form onSubmit={(e) => handleSearch(e)}>
                <input
                  type="text"
                  placeholder="Search...."
                  name="search"
                  onChange={(e) => handleSearch(e)}
                />
                <button type="submit">
                  {" "}
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="LM2-M2">
            <div className="LM2-M2-1">
              {" "}
              {menu.length === 0
                ? Array.from({ length: 10 }).map((_, index) => (
                    <ShimmerCard key={index} />
                  ))
                : menu.map((item) => {
                    return (
                      <div key={item.product_id}>
                        <MenuCard
                          isveged={item.isveged}
                          product_name={item.product_name}
                          product_image={item.product_image}
                          product_price={item.product_price}
                          product_qantity={item.quantity}
                          product_id={item.product_id}
                          button_state={activeId.includes(item.product_id)}
                        />
                      </div>
                    );
                  })}{" "}
            </div>
          </div>
        </div>
        <div className="LM2-Right"></div>
      </div>
    </div>
  );
}
