const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./src/app/routes/routes.js");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", Routes);

app.use('/getImage' , express.static("public/Images"))
  

module.exports = app;
