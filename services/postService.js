const postSchema = require("../schemas/post.js");

const PostSchema = new postSchema();

module.exports = class postService {
  constructor() {
    this.postSchema = PostSchema;
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
    return await this.postSchema.updatePost(postId, nickname, content);
  }

  async deletePost(nickname, postId) {
    return await this.postSchema.deletePost(nickname, postId);
  }
};
