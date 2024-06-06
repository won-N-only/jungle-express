const express = require("express");
const app = express();
const port = 8080;

const connect = require("./schemas/index.js");
connect();

app.use(express.json()); // json 파싱해서 res.body에 담음 (urlencoded({extended: false}))는 html

const indexRouter = require("./routes/index.js");
app.use("/api", [indexRouter]); // 일단 index로 보냄

app.get("/", (req, res) => {
  res.send("반갑습 니다 ㅎㅎ");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
