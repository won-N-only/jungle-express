const userSchema = require("../schemas/user.js");
const UserSchema = new userSchema();

module.exports = class userService {
  constructor() {
    this.userSchema = UserSchema;
  }

  findUser(nickname) {
    return this.userSchema.findUser(nickname);
  }

  createUser(nickname, password) {
    return this.userSchema.createUser(nickname, password);
  }
};
