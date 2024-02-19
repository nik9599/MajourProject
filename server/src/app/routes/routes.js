const express = require("express");
const { signUpUser, loginUser } = require("../controller/auth-controller.js");
const signUpMidelware = require("../middelware/signUpMiddlWare.js");
const createTabel = require("../controller/createTabel.js")
const Routes = express.Router();

//------Declaring All The Routes-------

//---SignUp Routes---------------------
Routes.post("/signUp", signUpMidelware, signUpUser);
Routes.get("/login/:email/:password", loginUser);

//------orders routes-------------------
Routes.get('/createTabel',createTabel)

module.exports = Routes;
