const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");

router.get("/", (req, res) => {
  res.send("API에 오신걸 환영합니다"); // 루트 경로 요청 처리
});

router.use("/posts", postsRouter); // ./api/posts 경로에 postsRouter 연결
router.use("/comments", commentsRouter); // ./api/comments 경로에 commentsRouter 연결

module.exports = router;
