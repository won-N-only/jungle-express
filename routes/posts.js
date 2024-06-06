const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

/**  전체 게시글 목록 조회 */
router.get("/", async (req, res) => {
  try {
    const posts = await postSchema.find({}).sort("-date");
    const results = posts.map((post) => {
      return {
        title: post.title,
        writer: post.writer,
        date: post.date,
        postId: post.postId,
      };
    });
    res.json({posts: results});
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
      date: new Date(),
    });

    console.log("입력 대성공");
    res.json({posts: createPost}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "입력 대 실 패 "});
  }
});

/** 게시글 조회 */


module.exports = router;
