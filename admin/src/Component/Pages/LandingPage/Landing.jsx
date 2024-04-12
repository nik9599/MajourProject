import React, { useCallback, useEffect, useState } from "react";
import MenuCard from "../Card/MenuCard/MenuCard.jsx";
import "./Landing.css";
import category from "../../utils/common/category.js";
import SideMenu from "../Card/SideMenuCard/SideMenu.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";
import Cart from "../CartPage/Cart.jsx";
import ShimmerCard from "../ShimmerCard/MenuShimmer/ShimmerCard.jsx";
import { getRequest } from "../../API/API.js";
import { useSelector } from "react-router-dom";

export default function Landing() {
  const [cartSize, setCartSize] = useState(0);
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [menu, setMenu] = useState([]);
  const [activeId, setActiveId] = useState([]);
  const [callCart, setCallCart] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  // const [sampleData1, setSampleData1] = useState([]);

  //------------------------fetching total price-----------------------------------------------

  const fetchDataMain = async () => {
    try {
      const resp = await getRequest(null, "/getAllProduct");

      if (resp.success) {
        setSampleData(resp.data);
        setMenu(resp.data);
        return true;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  useEffect(() => {
    //--------------------- fetching the size of cart---------------------------------------------

    const subscription = cartObservabel.getAllItems().subscribe((items) => {
      setCartSize(cartObservabel.getTheSizeOfCartItem());
    });

    fetchDataMain();

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

  //----------------------sorting search on Veg/Non-Veg---------------------------------------------------------

  const fetchData = async (prop) => {
    const resp = await getRequest(null, `/getVegProduct/${prop}`, null);
    setSampleData(resp.data);
    setMenu(resp.data);
  };

  const isVegedDataCalling = async (prop) => {
    if (prop == "veg") {
      if (veg) {
        const t = fetchDataMain();
        if (t) {
          setVeg(false);
        }
      } else {
        setVeg(!veg);
        setNonVeg(false);
        fetchData(prop);
      }
    } else if (prop == "nonVeg") {
      if (nonVeg) {
        const t = fetchDataMain();
        if (t) {
          setNonVeg(false);
        }
      } else {
        setVeg(false);
        setNonVeg(!nonVeg);
        fetchData(prop);
      }
    }
  };

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
    <div>
      {callCart ? (
        <Cart />
      ) : (
        <div className="LM">
          <div className="LM1">
            <div className="LM1-B">
              <div
                className="LM1-B1"
                onClick={() => {
                  // setVeg(!veg);
                  isVegedDataCalling("veg");
                }}
                tabIndex="0"
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
                  // setVeg(false);
                  // setNonVeg(!nonVeg);
                  isVegedDataCalling("nonVeg");
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
                  {menu.length === 0
                    ? // Render loading state if the menu array is empty
                      Array.from({ length: 10 }).map((_, index) => (
                        <ShimmerCard key={index} />
                      ))
                    : // Render menu items if the menu array is not empty
                      menu.map((item) => (
                        <div key={item.product_id}>
                          <MenuCard
                            product_name={item.product_name}
                            product_image={item.product_image}
                            product_price={item.product_price}
                            product_id={item.product_id}
                            button_state={activeId.includes(item.product_id)}
                            isVeged={item.isveged}
                          />
                        </div>
                      ))}
                </div>
              </div>
              {cartSize > 0 && (
                <div
                  className="footer-div"
                  onClick={() => {
                    setCallCart(!callCart);
                  }}
                >
                  <p>Cart</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
