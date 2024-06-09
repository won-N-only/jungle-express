const UserSchema = new (require("../schemas/user.js"))();

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

  validateNickname(nickname) {
    if (nickname.length < 3) return "닉은 3글자 이상이어야";
    if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(nickname))
      return "닉엔 영어숫자만이요";
    return null;
  }

  validatePassword(password, nickname, confirmPassword) {
    if (password.length < 4) return "비밀번호는 4자이상";
    if (password.includes(nickname)) return "비번안에 닉이 있어요";
    if (password !== confirmPassword) return "비밀번호달라요";
    return null;
  }
};
