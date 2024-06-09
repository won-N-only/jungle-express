const commentSchema = require("../schemas/comment.js");
const CommentSchema = new commentSchema();

module.exports = class commentService {
  constructor() {
    this.commentSchema = CommentSchema;
  }

  getComment(postId) {
    return this.commentSchema.getComment(postId);
  }

  postComment(comment) {
    return this.commentSchema.postComment(comment);
  }

  updateComment(commentId, nickname, content) {
    return this.commentSchema.updateComment(commentId, nickname, content);
  }

  deleteComment(commentId, nickname) {
    return this.commentSchema.deleteComment(commentId, nickname);
  }
};
