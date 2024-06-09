const postSchema = require("../schemas/post.js");
const PostSchema = new postSchema();
const commentSchema = require("../schemas/comment.js");
const CommentSchema = new commentSchema();

module.exports = class postService {
  constructor() {
    this.postSchema = PostSchema;
    this.commentSchema = CommentSchema;
  }

  getPosts() {
    return this.postSchema.getPosts();
  }

  postPost(post) {
    return this.postSchema.postPost(post);
  }

  findPost(postId) {
    return this.postSchema.findPost(postId);
  }

  updatePost(postId, nickname, content) {
    return this.postSchema.updatePost(postId, nickname, content);
  }

  deletePost(nickname, postId) {
    this.commentSchema.deleteComments(postId, nickname);
    return this.postSchema.deletePost(nickname, postId);
  }
};
