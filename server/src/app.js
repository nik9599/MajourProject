const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./app/routes/routes.js");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", Routes);

module.exports = app;
