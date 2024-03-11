import React, { useCallback, useEffect, useState } from "react";
import MenuCard from "../Card/MenuCard/MenuCard.jsx";
import "./Landing.css";
import category from "../../utils/common/category.js";
import SideMenu from "../Card/SideMenuCard/SideMenu.jsx";
import cartObservabel from "../../utils/CartObservabel/cartObservabel.js";
import SampleData from "../../utils/common/sampelData.js";
import Cart from "../CartPage/Cart.jsx";
import ShimmerCard from "../ShimmerCard/OrderShimmer/MenuShimmer/ShimmerCard.jsx";


export default function Landing() {
  const [cartSize, setCartSize] = useState(0);
  const [total, setTotal] = useState();
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [menu, setMenu] = useState([]);
  const [activeId, setActiveId] = useState([]);
  const [callCart, setCallCart] = useState(false);

  const name = " ";

  //------------------------fetching total price-----------------------------------------------

  useEffect(() => {
    setTotal(cartObservabel.getTheTotal());
  }, [cartSize]);

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
      if (str === "veg") {
        setNonVeg(false);
        setVeg((prevVeg) => !prevVeg); // Toggle veg state
      } else {
        setVeg(false);
        setNonVeg((prevNonVeg) => !prevNonVeg); // Toggle nonVeg state
      }
    },
    [veg, nonVeg]
  );

  useEffect(() => {
    if (veg) {
      const filteredMenu = SampleData.filter(
        (item) => item.vegetarian === true
      );
      setMenu(filteredMenu);
    } else if (nonVeg) {
      const filteredMenu = SampleData.filter(
        (item) => item.nonVegetarian === true
      );
      setMenu(filteredMenu);
    } else {
      setMenu(SampleData);
    }
  }, [veg, nonVeg]);

  //------------------------function for Searching-------------------------------------------------

  const handleSearch = useCallback(
    (e) => {
      const search = e.target.value.toLowerCase(); // Get the search string (case-insensitive)

      // Filter SampleData based on product_name containing the search string (case-insensitive)
      const filteredMenu = SampleData.filter((item) =>
        item.product_name.toLowerCase().includes(search)
      );

      setMenu(filteredMenu); // Update menu state with filtered results
    },
    [setMenu]
  );

  //-----------------------function for search on the base of category------------------------------

  const categorySearch = useCallback(
    (search) => {
      const filteredMenu = SampleData.filter(
        (item) => item.product_category === search
      );
      setMenu(filteredMenu);
    },
    [setMenu]
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
                  setCategory("veg");
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
                  <p>Your Total</p>
                  <p>=</p>
                  <p> {total}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
