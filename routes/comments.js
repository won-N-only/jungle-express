const express = require("express");
const router = express.Router();

const commentSchema = require("../schemas/comment.js");

/** 댓글 목록 조회 */
router.get("/:postId", async (req, res) => {
  try {
    const {postId} = req.params;
    const comments = await commentSchema.find({postId: postId}).sort("-date");
    res.status(200).json({comments: comments});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "에러출동~~"});
  }
});

module.exports = router;
