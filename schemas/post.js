const mongoose = require("mongoose");

/** Post에는 [제목, 작성자명, 작성날짜, 비밀번호, 내용, 게시글id]이 있어야함 */
const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  writer: {type: String, required: true},
  date: {type: Date, required: true},
  password: {type: String, required: true},
  content: {type: String, required: true},
});

module.exports = mongoose.model("Post", postSchema);
