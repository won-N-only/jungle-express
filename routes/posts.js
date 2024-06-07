const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");
const authMiddleware = require("../middlewares/auth.js");

/**  전체 게시글 목록 조회 */
router.get("/", async (req, res) => {
  try {
    console.log("전체 조회 시도 중");
    const posts = await postSchema
      .find({}, {title: 1, nickname: 1, date: 1, _id: 1})
      .sort("-date");

    console.log("전체 조회 성 공");
    res.json({posts: posts, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(503).json({errorMessage: "데이터 베이스 펑퍼ㅓㅇㅇ"});
  }
});

/** 게시글 작성 */
router.post("/", authMiddleware, async (req, res) => {
  const {title, content} = req.body;
  const nickname = res.locals.nickname;

  if (!title || !content) {
    console.log("입력 시도 실패");
    return res.status(400).json({errMessage: "입력폼을 다 채워주세요"});
  }

  try {
    console.log("입력 시도 중");
    const createPost = await postSchema.create({
      title: title,
      nickname: nickname,
      content: content,
      date: new Date().toISOString(),
    });
    console.log("입력 대성공");

    res.json({posts: createPost, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "입력 대 실 패 "});
  }
});

/** 게시글 조회 */
router.get("/:postId", async (req, res) => {
  try {
    const {postId} = req.params;
    console.log("조회 시도");
    const post = await postSchema.findById(postId);
    if (!post) res.status(400).json({errorMessage: "post 없음"});
    console.log("조회 대 성 공");

    res.json({posts: post, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "조 회 대 실 패 "});
  }
});

/** 게시글 수정 */
router.patch("/:postId", authMiddleware, async (req, res) => {
  try {
    console.log("수정할 post 조회 시도");
    const {postId} = req.params;
    const post = await postSchema.findById(postId);

    const nickname = res.locals.nickname;
    if (post.nickname !== nickname)
      return res.status(400).json({errorMessage: "니가쓴글아니잖아"});

    console.log("수정 시도");
    const {content} = req.body;
    post.content = content;
    console.log("수정 성공");

    await post.save();
    res.status(200).json({posts: post, result: "success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

/** 게시글 삭제 */
router.delete("/:postId", authMiddleware, async (req, res) => {
  const {postId} = req.params;
  const post = await postSchema.findById(postId);

  if (!post) {
    const err = new Error();
    console.error("게시글이없어요");
    throw err;
  }

  const nickname = res.locals.nickname;
  if (post.nickname !== nickname)
    return res.status(400).json({errorMessage: "니가쓴글아니잖아"});

  try {
    console.log("삭제 시도");
    await postSchema.deleteOne({_id: postId});
    console.log("삭제 성공");

    res.status(200).json({result: "success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

module.exports = router;
