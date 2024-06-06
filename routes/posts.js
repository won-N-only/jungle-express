const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

router.get("/", async (req, res) => {
  const posts = await postSchema.find({}).sort("-date");
  const results = posts.map((post) => {
    return {
      title: title,
      writer: writer,
      date: date,
    };
  });
  res.json({posts: results});
});

router.post("/", async (req, res) => {
  const {title, writer, password, content} = req.body;

  /** 나중에 valid check로 바꾸기 */
  if (!title || !writer || !password || !content) {
    console.log("입력 시도 실패");
    return res.status(400).json({errMessage: "입력폼을 다 채워주세요"});
  }

  console.log("입력 시도 중");
  const createPost = await postSchema.create({
    title: title,
    writer: writer,
    password: password,
    content: content,
    date: new Date(),
  });
  console.log("입력 대성공");
  res.json({posts: createPost}).status(200);
});
module.exports = router;
