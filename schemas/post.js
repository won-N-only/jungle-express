const mongoose = require("mongoose");

/** Post에는 [제목, 작성자명, 작성날짜, 비밀번호, 내용, 게시글id]이 있어야함 */
const postSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    nickname: {type: String, required: true},
    date: {type: Date, required: true},
    content: {type: String, required: true},
  },
  {strict: true}
);

const PostSchema = mongoose.model("Post", postSchema);

module.exports = class mongoosePost {
  getPosts() {
    return PostSchema.find({}, {title: 1, nickname: 1, date: 1, _id: 1}).sort(
      "-date"
    );
  }

  postPost(post) {
    return PostSchema.create(post);
  }

  findPost(postId) {
    return PostSchema.find({_id: postId});
  }

  updatePost(postId, nickname, content) {
    return PostSchema.findOneAndUpdate(
      {_id: postId, nickname: nickname},
      {$set: {content: content}},
      {new: true}
    );
  }

  deletePost(nickname, postId) {
    return PostSchema.findOneAndDelete({
      nickname: nickname,
      _id: postId,
    });
  }
};
