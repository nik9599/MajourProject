const express = require("express");
const {
  signUpUser,
  loginUser,
  getByUserId,
} = require("../controller/auth-controller.js");
const signUpMidelware = require("../middelware/signUpMiddlWare.js");
const tokenValidator = require("../middelware/tokenValidator.js");
const upload = require("../../utils/ImageMulter.js");
const {
  orderId,
  addOrderItem,
  getActiveOrder,
  updateOrder,
  updateOrderOffline,
  getAllOrderById,
  getCompletedOrder,
} = require("../controller/order-controller.js");
const {
  getAllProducts,
  getCategoryProduct,
  insertProduct,
  getUpdateProduct,
  increasProductQuantity,
  decreseProductQuantity,
  decreseProductQuantityOffline,
  increasProductQuantityOffline,
  deletProductData,
  getUpdateProductOffline,
} = require("../controller/product-controller.js");

const {
  getInventory,
  updateInventoryValue,
} = require("../controller/Inventory-controller.js");

const createTabelQuery = require("../controller/createTabel.js");
const Routes = express.Router();

//------Declaring All The Routes-------

//---------Auth Routes---------------------
Routes.post("/signUp", signUpMidelware, signUpUser);
Routes.get("/login/:email/:password", loginUser);
Routes.get("/getUserById/:userId", tokenValidator, getByUserId);

//------orders routes-------------------
Routes.post("/order", tokenValidator, orderId);
Routes.post("/addingItem", tokenValidator, addOrderItem);
Routes.get("/activeOrder", tokenValidator, getActiveOrder);
Routes.put("/updateOrder", tokenValidator, updateOrder);
Routes.get("/completedOrder", tokenValidator, getCompletedOrder);

//----------product routes----------------
Routes.get("/getAllProduct", getAllProducts);
Routes.get("/getCategroyProduct/:category", tokenValidator, getCategoryProduct);
Routes.get(
  "/increseQuantity/:product_id",
  tokenValidator,
  increasProductQuantity
);
Routes.get(
  "/decreaseQuantity/:product_id",
  tokenValidator,
  decreseProductQuantity
);

//---------------routes for admin ---------------------------------------------------------------

//------------------admin routes for product---------------------------------------------------

Routes.post("/insertProduct", insertProduct);
Routes.put("/updateProduct", tokenValidator, getUpdateProduct);
Routes.get(
  "/increseQuantityOffline/:product_id",
  tokenValidator,
  increasProductQuantityOffline
);
Routes.get(
  "/decreaseQuantityOffline/:product_id",
  tokenValidator,
  decreseProductQuantityOffline
);
Routes.delete("/deletProduct/:product_id", tokenValidator, deletProductData);

//---------------------admin routes for Order---------------------------------------------------

Routes.put("/updateOrderOffline", tokenValidator, updateOrderOffline);
Routes.post("/getTheOrderById", tokenValidator, getAllOrderById);

//-----------------------admin routes for Inventory------------------------------------------------

Routes.get("/getTheInventory", tokenValidator, getInventory);
Routes.put("/updateInventory", tokenValidator, updateInventoryValue);

//------------------routes for uploading image----------------

Routes.post("/upload", upload.single("productImage"), (req, res) => {
  const imageUrl = `http://localhost:8080/getImage/${req.file.filename}`;
  return res.status(200).json({ url: imageUrl, success: true });
});

Routes.get("/createTabel", createTabelQuery);

module.exports = Routes;
