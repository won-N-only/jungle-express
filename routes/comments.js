const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");
const commentSchema = require("../schemas/comment.js");

/** 댓글 목록 조회 */
router.get("/:postId", async (req, res) => {
  try {
    const {postId} = req.params;
    const comments = await commentSchema.find({postId: postId}).sort("-date");
    res.status(200).json({comments: comments, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

/** 댓글 작성 */
router.post("/:postId", async (req, res) => {
  console.log("엘렐레");
  const {postId} = req.params;
  const {writer, password, content} = req.body;
  const post = await postSchema.find({postId: postId});

  if (!writer || !password || !content || !post) {
    console.error("입력 안한게있네용");
    return res.status(400).json({errorMessage: "입력 안한게 있네용"});
  }

  try {
    console.log("댓글 작성 시도");
    const createComment = await commentSchema.create({
      writer: writer,
      password: password,
      date: new Date().toISOString(),
      content: content,
      postId: postId,
    });
    console.log("댓글 작 성성 공 ");

    res.json({posts: createComment, result: "success"}).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "  에 러 등 장"});
  }
});

/** 댓글 수정 */
router.patch("/:commentId", async (req, res) => {
  try {
    const {commentId} = req.params;
    const {content} = req.body;

    if (!content) return res.json({result: "댓글 내용 입력좀"}).status(400);

    console.log("수정 시도");
    const comment = await commentSchema.findOne({_id: commentId});
    comment.content = content;
    comment.save();
    console.log("수정 성공");

    res.status(200).json({comment: comment, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "에러가 나타났다"});
  }
});

/** 댓글 삭제 */
router.delete("/:commentId", async (req, res) => {
  try {
    const {commentId} = req.params;
    await commentSchema.deleteOne({_id: commentId});
    res.send({});
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
