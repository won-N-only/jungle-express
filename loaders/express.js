const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes/index");
const {swaggerUi, specs} = require("../config/swagger.js");
const cors = require("cors");

module.exports = ({app}) => {
  app.use(cors({credential: true}));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public")); // public 폴더를 정적 파일 제공 경로로 설정

  app.use("/api", routes);
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // index.html 파일 전송
  });

  
};
