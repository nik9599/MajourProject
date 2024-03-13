import React, { useCallback, useState, useEffect } from "react";
import "./insertData.css";
import CategoryDropDown from "../CateGoryDropDown/CategoryDropDown";
import SideNavBar from "../SideNavBar/SidenavBar.jsx";
import { getRequest, postRequest } from "../../API/API.js";

const productlayout = {
  product_name: "",
  product_image: "",
  product_price: "",
  quantity: "",
  category: "",
  isveged: false,
  isnonveged: false,
};

export default function InsertData() {
  const [category, setCategory] = useState("");
  const [isVeged, setisVeged] = useState(false);
  const [isNonVeged, setIsNonVegeed] = useState(false);
  const [input, setInput] = useState(productlayout);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");


  //----------------------useEffect for uploading Image---------------------

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("productImage", file);

        //API calling

        const resp = await postRequest(data, "/upload");

        if (resp.success) {
          console.log(resp.url);
          setImage(resp.url);
        }
      }
    };
    getImage();
  }, [file]);

  //---------------------funcation for handling user input--------------------------------

  const handelInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handelRadio = useCallback(
    (str) => {
      if (str === "veg") {
        setisVeged(true);
        setIsNonVegeed(false);
      } else {
        setisVeged(false);
        setIsNonVegeed(true);
      }
    },
    [setisVeged, setisVeged]
  );

//-----------------------------------funcation for uploading product detail to DB---------------------------------

  const uploadData = async (e) => {
    e.preventDefault();
    const productDetail = {
      Product_Name: input.product_name,
      Product_Image: image,
      Product_Price: input.product_price,
      Quantity: input.quantity,
      Category: category,
      isVeged: isVeged,
      isNonVeged: isNonVeged,
    };

    const resp = await postRequest(productDetail, "/insertProduct");

    if (resp.success) {
      window.alert("Done");
    }
  };

  return (
    <div className="Insert-container">
      <SideNavBar />
      <div className="image-upload-container">
        <img className="product_image" src={image} />
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="upload-button" htmlFor="fileInput">
          Upload
        </label>
      </div>
      <div className="product_data_container">
        <form className="product_form" onSubmit={uploadData}>
          <label className="product_name_label"> Product Name </label>
          <input
            type="text"
            placeholder="Enter the product name"
            name="product_name"
            value={input.product_name}
            onChange={(e) => handelInput(e)}
          />

          <div className="category-container">
            <label className="product_categories_label">
              Product Categories
            </label>

            <CategoryDropDown setSelected={setCategory} selected={category} />
          </div>

          <div className="radio-button-container">
            <label className="veg_label">Veg</label>
            <input
              type="radio"
              name="oneOption"
              onClick={() => handelRadio("veg")}
            />

            <label className="nonVeg-label">Non Veg</label>
            <input
              type="radio"
              name="oneOption"
              onClick={() => handelRadio("nonveg")}
            />
          </div>

          <label className="product_price_label">Product Price</label>
          <input
            type="text"
            name="product_price"
            onChange={(e) => handelInput(e)}
            value={input.product_price}
          />

          <label className="product-quantity_label">Product Quantity</label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => handelInput(e)}
            value={input.quantity}
          />

          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
