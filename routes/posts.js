const express = require("express");
const router = express.Router();
const postService = require("../services/postService.js");
const authMiddleware = require("../middlewares/auth.js");
const verify = require("../middlewares/objid.js");
const PostService = new postService();

/**  전체 게시글 목록 조회 */
router.get("/", async (req, res) => {
  try {
    console.log("전체 조회 시도 중");
    const posts = await PostService.getPosts();
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
    const post = {title, content, nickname, date: new Date().toISOString()};
    const postPost = await PostService.postPost(post);
    console.log("입력 대성공");

    res.json({posts: postPost, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "입력 대 실 패 "});
  }
});

/** 게시글 조회 */
router.get("/:postId", verify.post, async (req, res) => {
  try {
    const {postId} = req.params;
    console.log("조회 시도");
    const findPost = await PostService.findPost(postId);
    if (!findPost.length)
      return res.status(400).json({errorMessage: "post 없음"});
    console.log("조회 대 성 공");

    res.json({posts: findPost, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(502).json({errorMessage: "조 회 대 실 패 "});
  }
});

/** 게시글 수정 */
router.patch("/:postId", verify.post, authMiddleware, async (req, res) => {
  try {
    console.log("수정할 post 조회 시도");
    const {postId} = req.params;
    const {title, content} = req.body;
    const nickname = res.locals.nickname;

    console.log("수정 시도");
    const findPost = await PostService.updatePost(
      postId,
      nickname,
      title,
      content
    );

    if (!findPost)
      return res.status(404).json({errorMessage: "닉네임이 달라~~!"});
    console.log("수정 성공");

    res.status(200).json({posts: findPost, result: "success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

/** 게시글 삭제 */
router.delete("/:postId", verify.post, authMiddleware, async (req, res) => {
  const {postId} = req.params;
  const nickname = res.locals.nickname;
  try {
    console.log("삭제 시도");

    const deletedPost = await PostService.deletePost(nickname, postId);

    if (!deletedPost) {
      console.log("삭제 실패");
      return res.status(404).json({errorMessage: "없는데 ??"});
    }

    console.log("삭제 성공");

    res.status(200).json({result: "success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

module.exports = router;
