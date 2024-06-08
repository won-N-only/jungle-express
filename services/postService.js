const postSchema = require("../schemas/post.js");
const PostSchema = new postSchema();
const commentSchema = require("../schemas/comment.js");
const CommentSchema = new commentSchema();

module.exports = class postService {
  constructor() {
    this.postSchema = PostSchema;
    this.commentSchema = CommentSchema;
  }

  async getPosts() {
    return await this.postSchema.getPosts();
  }

  async postPost(post) {
    return await this.postSchema.postPost(post);
  }

  async findPost(postId) {
    return await this.postSchema.findPost(postId);
  }

  async updatePost(postId, nickname, content) {
    return this.postSchema.updatePost(postId, nickname, content);
  }

  async deletePost(nickname, postId) {
    await this.commentSchema.deleteComments(postId, nickname);
    return await this.postSchema.deletePost(nickname, postId);
  }
};
