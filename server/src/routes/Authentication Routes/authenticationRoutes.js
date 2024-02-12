const express = require("express");

const authRoutes = express.Router();

authRoutes.get("/login", (req, res) => {
  res.status(200).json({ msge: "you are calling login routes" });
});

module.exports = authRoutes;
