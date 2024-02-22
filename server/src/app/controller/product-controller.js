const db = require("../../database/database.js");
const constant = require("../../utils/constant.js");
const {
  InsertProduct,
  getALLProduct,
  getCategoriesProduct,
  updateProduct,
} = require("../Query/query.js");

const insertProduct = (req, res) => {
  const { Product_Name, Product_Image, Product_Price, Quantity, Category } =
    req.body;
  const values = [
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
  ];

  if (
    Product_Name == undefined ||
    Product_Image == undefined ||
    Product_Price == undefined ||
    Quantity == undefined ||
    Category == undefined
  ) {
    return res
      .status(404)
      .json({ msg: constant.PLEASE_ENTER_THE_MISSING_VALUE, success: false });
  }

  db.pool.query(InsertProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while entring the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      return res
        .status(200)
        .json({ msg: constant.PRODUCT_SAVED, success: true });
    }
  });
};

const getAllProducts = (req, res) => {
  db.pool.query(getALLProduct, (err, result) => {
    if (err) {
      console.log(`Error while fetching the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({ data: result.rows, success: true });
    }
  });
};

const getCategoryProduct = (req, res) => {
  const category = req.params.category;
  const values = [category];


  db.pool.query(getCategoriesProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while fetching the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      
      return res.status(200).json({ data: result.rows, success: true });
    }
  });
};

const getUpdateProduct = (req, res) => {

  const {
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
    product_Id,
  } = req.body;

  const values = [
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
    product_Id,
  ];

  db.pool.query(updateProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while fetching the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({ msg : constant.PRODUCT_UPDATED, success: true });
    }
  });
};

module.exports = {
  insertProduct,
  getAllProducts,
  getCategoryProduct,
  getUpdateProduct,
};
