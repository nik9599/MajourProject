const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/Authentication Routes/authenticationRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/v1/auth", authRoutes);

module.exports = app;
