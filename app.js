const express = require("express");
const app = express();
const port = 8080;

const connect = require("./schemas/index.js");
connect();

app.use(express.json()); // json 파싱해서 res.body에 담음 (urlencoded({extended: false}))는 html

app.use("/api", []); // 아직 라우터 없어서 공란

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
