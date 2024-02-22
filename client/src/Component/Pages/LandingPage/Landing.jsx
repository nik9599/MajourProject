import React from "react";
import MenuCard from "../MenuCard/MenuCard";
import "./Landing.css";
import sampelImage from "../../Image/smpelImage.jpg";
import category from "../../utils/Common Function/category";
import SideMenu from "../SideMenuCard/SideMenu";

export default function Landing() {
  return (
    <div className="LM">
      <div className="LM1">
        <div className="LM1-T">
          <div className="LM1-T1">
            <h1>Our Menu</h1>
          </div>
          <div className="LM1-T2">Search</div>
        </div>
        <div className="LM1-B">
          <div className="LM1-B1">
            <p>Veg</p>
          </div>
          <div className="LM1-B2">
            {" "}
            <p>NonVeg</p>{" "}
          </div>
        </div>
      </div>
      <div className="LM2">
        <div className="LM2-Left">{
          category.map(item=>{
            return(
              <div>
                <SideMenu items={item} />
                </div>
            )
          })
        }
        </div>
        <div className="LM2-Mid">
          <div className="LM2-M1"> <p> Sharing Combo </p></div>
          <div className="LM2-M2">
            <div className="LM2-M2-1" > 
              {" "}
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              <MenuCard  product_name="cream rool" product_image={sampelImage} product_price="20" product_id="1" />
              {" "}
            </div>
          </div>
        </div>
        <div className="LM2-Right" ></div>
      </div>
    </div>
  );
}
