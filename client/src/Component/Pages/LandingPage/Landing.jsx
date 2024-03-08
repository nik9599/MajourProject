import React, { useCallback, useEffect, useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import "./Landing.css";
import category from "../../utils/CommonFunction/category";
import SideMenu from "../SideMenuCard/SideMenu";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import { Link } from "react-router-dom";
import SampelData from "../../utils/CommonFunction/sampelData.js";
import { useSelector } from "react-redux";

export default function Landing() {
  const [cartSize, setCartSize] = useState(0);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [menu, setMenu] = useState(SampelData);
  const [activeId, setActiveId] = useState([]);
  const name = useSelector((state) => state.login.login.username);

  //--------------------- fetching the size of cart---------------------------------------------
  useEffect(() => {
    const subscription = cartObservabel.getAllItems().subscribe((items) => {
      setCartSize(cartObservabel.getTheSizeOfCartItem());
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const setCategory = useCallback(
    (str) => {
      console.log("call");
      if (str == "veg") {
        setNonVeg(false);
        setVeg(true);
      } else {
        setNonVeg(true);
        setVeg(false);
      }
    },
    [veg, nonVeg]
  );

  //------------------------function for Searching-------------------------------------------------

  const handleSearch = useCallback(
    (e) => {
      const search = e.target.value.toLowerCase(); // Get the search string (case-insensitive)

      // Filter SampleData based on product_name containing the search string (case-insensitive)
      const filteredMenu = SampelData.filter((item) =>
        item.product_name.toLowerCase().includes(search)
      );

      setMenu(filteredMenu); // Update menu state with filtered results
    },
    [setMenu]
  );

  //-----------------------function for search on the base of category------------------------------

  const categorySearch = useCallback(
    (search) => {
      const filteredMenu = SampelData.filter(
        (item) => item.product_category === search
      );
      setMenu(filteredMenu);
    },
    [setMenu]
  );

  return (
    <div className="LM">
      <div className="LM1">
        <div className="LM1-T">
          <div className="LM1-T1">
            <h1>Crave Cart</h1>
          </div>

          <div className="User-Div">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="User-Button">
                <i class="fa-regular fa-user"></i>
                <p>{name || "Login"}</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="LM1-B">
          <div
            className="LM1-B1"
            onClick={() => {
              setCategory("veg");
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
              setCategory("nonVeg");
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
              <div>
                <SideMenu
                  key={item.id + Math.random() * 10}
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
              {menu.map((item) => {
                return (
                  <div>
                    <MenuCard
                      key={item.product_id}
                      product_name={item.product_name}
                      product_image={item.product_image}
                      product_price={item.product_price}
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
