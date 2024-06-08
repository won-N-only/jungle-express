const commentSchema = require("../schemas/comment.js");
const CommentSchema = new commentSchema();
const postSchema = require("../schemas/post.js");
const PostSchema = new postSchema();

module.exports = class commentService {
  constructor() {
    this.commentSchema = CommentSchema;
    this.postSchema = PostSchema;
  }

  async getComment(postId) {
    return await this.commentSchema.getComment(postId);
  }

  async postComment(comment) {
    const post = await this.postSchema.findPost(comment.postId);
    if (!post.length) throw new Error("포스트가없어");

    return await this.commentSchema.postComment(comment);
  }

  async updateComment(commentId, nickname, content) {
    return await this.commentSchema.updateComment(commentId, nickname, content);
  }

  async deleteComment(commentId, nickname) {
    return await this.commentSchema.deleteComment(nickname, postId);
  }
};
