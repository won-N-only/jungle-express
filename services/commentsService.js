const commentSchema = require("../schemas/comment.js");
const CommentSchema = new commentSchema();
const postSchema = require("../schemas/post.js");
const PostSchema = new postSchema();

module.exports = class commentService {
  constructor() {
    this.commentSchema = CommentSchema;
    this.postSchema = PostSchema;
  }

  getComment(postId) {
    return this.commentSchema.getComment(postId);
  }

  postComment(comment) {
    const post = this.postSchema.findPost(comment.postId);
    if (!post) throw new Error("포스트가없어");

    return this.commentSchema.postComment(comment);
  }

  updateComment(commentId, nickname, content) {
    return this.commentSchema.updateComment(commentId, nickname, content);
  }

  deleteComment(commentId, nickname) {
    return this.commentSchema.deleteComment(commentId, nickname);
  }
};
