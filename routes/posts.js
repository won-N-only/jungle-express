const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

/**  전체 게시글 목록 조회 */
router.get("/", async (req, res) => {
  try {
    const posts = await postSchema
      .find({}, {title: 1, writer: 1, date: 1, _id: 1})
      .sort("-date");

    res.json({posts: posts});
  } catch (err) {
    console.error(err);
    res.status(503).json({errorMessage: "데이터 베이스 펑퍼ㅓㅇㅇ"});
  }
});

/** 게시글 작성 */
router.post("/", async (req, res) => {
  const {title, writer, password, content} = req.body;

  /** 나중에 valid check로 바꾸기 */
  if (!title || !writer || !password || !content) {
    console.log("입력 시도 실패");
    return res.status(400).json({errMessage: "입력폼을 다 채워주세요"});
  }

  console.log("입력 시도 중");

  try {
    const createPost = await postSchema.create({
      title: title,
      writer: writer,
      password: password,
      content: content,
      date: new Date().toISOString(),
    });

    console.log("입력 대성공");
    res.json({posts: createPost}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "입력 대 실 패 "});
  }
});

/** 게시글 조회 */
router.get("/:postId", async (req, res) => {
  try {
    console.log("조회 시도");

    const {postId} = req.params;
    const post = await postSchema.findById(postId);

    console.log("조회 대 성 공");

    res.json({posts: post}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "조 회 대 실 패 "});
  }
});

module.exports = router;
