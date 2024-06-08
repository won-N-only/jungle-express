const express = require("express");
const router = express.Router();
const commentService = require("../services/commentsService.js");
const authMiddleware = require("../middlewares/auth.js");

const CommentService = new commentService();

/** 댓글 목록 조회 */
router.get("/:postId", async (req, res) => {
  try {
    const {postId} = req.params;
    const getComment = await CommentService.getComment(postId);
    console.log("댓글 조회 성공");
    res.status(200).json({comments: getComment, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

/** 댓글 작성 */
router.post("/:postId", authMiddleware, async (req, res) => {
  const {postId} = req.params;
  const {content} = req.body;

  const nickname = res.locals.nickname;

  if (!content) {
    console.error("입력 안한게있네용");
    return res.status(400).json({errorMessage: "입력 안한게 있네용"});
  }

  try {
    console.log("댓글 작성 시도");
    const postComment = await CommentService.postComment({
      nickname,
      content,
      postId,
      date: new Date().toISOString(),
    });
    console.log("댓글 작 성성 공 ");

    res.json({comments: postComment, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(404).json({errorMessage: err.message});
  }
});

/** 댓글 수정 */
router.patch("/:commentId", authMiddleware, async (req, res) => {
  const {commentId} = req.params;
  const {content} = req.body;
  const nickname = res.locals.nickname;
  if (!content) return res.json({result: "댓글 내용 입력좀"}).status(400);

  try {
    console.log("수정 시도");
    const updateComment = await CommentService.updateComment(
      commentId,
      nickname,
      content
    );

    if (!updateComment)
      return res.status(400).json({errorMessage: "니 글 아니잖아"});
    console.log("수정 성공");

    res.status(200).json({comments: updateComment, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "에러가 나타났다"});
  }
});

/** 댓글 삭제 */
router.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const nickname = res.locals.nickname;
    const {commentId} = req.params;
    const deleteComment = await CommentService.deleteComment(
      commentId,
      nickname
    );
    if (!deleteComment) throw new Error("댓글이 없다잉");
    res.send({comments: deleteComment});
  } catch (err) {
    console.error(err);
    res.status(404).json({errorMessage: "에러가 나타났다"});
  }
});

module.exports = router;
