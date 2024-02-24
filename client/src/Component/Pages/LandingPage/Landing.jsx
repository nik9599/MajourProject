import React, { useEffect, useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import "./Landing.css";
import sampelImage from "../../Image/smpelImage.jpg";
import category from "../../utils/Common Function/category";
import SideMenu from "../SideMenuCard/SideMenu";
import cartObservabel from "../../utils/CartObservabel/cartObservabel";
import { Link } from "react-router-dom";

export default function Landing() {

  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const subscription = cartObservabel.getAllItems().subscribe(items => {
      setCartSize(items.length);
    });
    
    // Unsubscribe on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);


  return (
    <div className="LM">
      <div className="LM1">
        <div className="LM1-T">
          <div className="LM1-T1">
            <h1>Our Menu</h1>
          </div>
          <div className="LM1-T2">
            <form>
              <input type="text" placeholder="Search...." />
              <button type="submit">
                {" "}
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="LM1-B">
          <div className="LM1-B1">
            <p>Veg</p>
          </div>
          <div className="LM1-B2">
            {" "}
            <p>NonVeg</p>{" "}
          </div>
          {cartSize > 0 && (
            <div className="LM1-B3">
              <button>
                <Link to={"/cart"} > <i class="fa-solid fa-cart-shopping fa-2xl "></i></Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="LM2">
        <div className="LM2-Left">
          {category.map((item) => {
            return (
              <div>
                <SideMenu items={item} />
              </div>
            );
          })}
        </div>
        <div className="LM2-Mid">
          <div className="LM2-M1">
            {" "}
            <p> Sharing Combo </p>
          </div>
          <div className="LM2-M2">
            <div className="LM2-M2-1">
              {" "}
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />
              <MenuCard
                product_name="cream rool"
                product_image={sampelImage}
                product_price="20"
                product_id="1"
              />{" "}
            </div>
          </div>
        </div>
        <div className="LM2-Right"></div>
      </div>
    </div>
  );
}
