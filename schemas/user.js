const mongoose = require("mongoose");

/** user에는 [아이디:필요없대, 비밀번호, 닉네임]이 있어야함 */
const userSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = mongoose.model("User", userSchema);

module.exports = class mongooseUser {
  findUser(nickname) {
    return UserSchema.findOne({nickname: nickname});
  }

  createUser(nickname, password) {
    return UserSchema.create({nickname, password});
  }
};
