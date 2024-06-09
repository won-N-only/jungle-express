const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes/index");
const {swaggerUi, specs} = require("../config/swagger.js");

module.exports = ({app}) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", routes);

  app.get("/", (req, res) => {
    res.send("🍺🍕 🍻반가워요 🍻🍕🍺");
  });
};
