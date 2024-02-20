const express = require("express");
const { signUpUser, loginUser } = require("../controller/auth-controller.js");
const signUpMidelware = require("../middelware/signUpMiddlWare.js");
const createTabel = require("../controller/createTabel.js");
const {
  orderId,
  addOrderItem,
  getActiveOrder,
  updateOrder,
} = require("../controller/order-controller.js");
const Routes = express.Router();

//------Declaring All The Routes-------

//---SignUp Routes---------------------
Routes.post("/signUp", signUpMidelware, signUpUser);
Routes.get("/login/:email/:password", loginUser);

//------orders routes-------------------
Routes.post("/order", orderId);
Routes.post("/addingItem", addOrderItem);
Routes.get("/activeOrder", getActiveOrder);
Routes.put("/updateOrder", updateOrder);

Routes.get("/createTabel", createTabel);

module.exports = Routes;
