const express = require("express");
const { signUpUser, loginUser } = require("../controller/auth-controller.js");
const signUpMidelware = require("../middelware/signUpMiddlWare.js");
const tokenValidator = require("../middelware/tokenValidator.js");
const upload = require("../../utils/ImageMulter.js")

const {
  orderId,
  addOrderItem,
  getActiveOrder,
  updateOrder,
} = require("../controller/order-controller.js");
const {
  getAllProducts,
  getCategoryProduct,
  insertProduct,
  getUpdateProduct,
} = require("../controller/product-controller.js");
const createTabelQuery = require("../controller/createTabel.js");
const Routes = express.Router();



//------Declaring All The Routes-------

//---SignUp Routes---------------------
Routes.post("/signUp", signUpMidelware, signUpUser);
Routes.get("/login/:email/:password", loginUser);

//------orders routes-------------------
Routes.post("/order", tokenValidator, orderId);
Routes.post("/addingItem", tokenValidator, addOrderItem);
Routes.get("/activeOrder", tokenValidator, getActiveOrder);
Routes.put("/updateOrder", tokenValidator, updateOrder);
// Routes.get("/completedOrder" , )

//----------product routes----------------
Routes.get("/getAllProduct", tokenValidator, getAllProducts);
Routes.get("/getCategroyProduct/:category", tokenValidator, getCategoryProduct);
Routes.post("/insertProduct",  insertProduct);
Routes.put("/updateProduct", tokenValidator, getUpdateProduct);


//------------------routes for uploading image----------------

Routes.post("/upload",upload.single("productImage"),(req , res)=>{
  console.log(req.file);
  const imageUrl = `http://localhost:8080/getImage/${req.file.filename}`
  return res.status(200).json({url :imageUrl , success : true})
})



Routes.get("/createTabel", createTabelQuery);

module.exports = Routes;
