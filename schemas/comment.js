const mongoose = require("mongoose");

/** comments에는 [작성자명, 비밀번호, 작성날짜, 내용, 게시글id, 댓글id]가 있어야함 */
const commentSchema = new mongoose.Schema(
  {
    nickname: {type: String, required: true},
    date: {type: Date, required: true},
    content: {type: String, required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, required: true},
  },
  {strict: true}
);

const CommentSchema = mongoose.model("comment", commentSchema);

module.exports = class mongooseComment {
  getComment(postId) {
    return CommentSchema.find({postId: postId}).sort("-date");
  }

  postComment(comment) {
    const newComment = new CommentSchema(comment);
    return newComment.save();
  }

  updateComment(commentId, nickname, content) {
    return CommentSchema.findOneAndUpdate(
      {
        _id: commentId,
        nickname: nickname,
      },
      {$set: {content: content}},
      {new: true}
    );
  }

  deleteComment(commentId, nickname) {
    return CommentSchema.findOneAndDelete({
      _id: commentId,
      nickname: nickname,
    });
  }

  deleteComments(postId, nickname) {
    return CommentSchema.deleteMany({
      postId: postId,
      nickname: nickname,
    });
  }
};
