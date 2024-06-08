const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes/index");

module.exports = ({ app }) => {
  app.use(express.json());
  app.use(cookieParser());
  
  app.use("/api", routes);

  app.get("/", (req, res) => {
    res.send("🍺🍕 🍻반가워요 🍻🍕🍺");
  });
};
