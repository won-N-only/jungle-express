const mongoose = require("mongoose");

/** comments에는 [작성자명, 비밀번호, 작성날짜, 내용, 게시글id, 댓글id]가 있어야함 */
const commentSchema = new mongoose.Schema({
  writer: {type: String, required: true},
  password: {type: String, required: true},
  date: {type: Date, required: true},
  content: {type: String, required: true},
  postId: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model("Comment", commentSchema);
