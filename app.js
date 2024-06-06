const express = require("express");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");
const connect = require("./schemas/index.js");
connect();

app.use(express.json()); // json 파싱해서 res.body에 담음 (urlencoded({extended: false}))는 html
app.use(cookieParser()); // 쿠키 파싱해서 user.cookies 등으로 쓸 수 있게함
const indexRouter = require("./routes/index.js");
app.use("/api", [indexRouter]); // 일단 index로 보냄

app.get("/", (req, res) => {
  res.send("🍺🍕 🍻반가워요 🍻🍕🍺"); // 여기에 async 안걸고 여러줄 적으면 터져
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
