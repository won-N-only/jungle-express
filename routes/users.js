const express = require("express");
const router = express.Router();

const UserSchema = require("../schemas/user.js");

/** 회원가입 */
function validateNickname(nickname) {
  if (nickname.length < 3) return "닉은 3글자 이상이어야";
  if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(nickname)) return "닉엔 영어숫자만이요";
  return null;
}

function validatePassword(password, nickname) {
  if (password.length < 4) return "비밀번호는 4자이상";
  if (password.includes(nickname)) return "비번안에 닉이 있어요";
  return null;
}
router.post("/", async (req, res) => {
  const {nickname, password, confirmPassword} = req.body;

  const nickErr = validateNickname(nickname);
  if (nickErr) return res.status(400).json({errorMessage: nickErr});

  const pwdErr = validatePassword(password, nickname);
  if (pwdErr) return res.status(400).json({errorMessage: pwdErr});

  if (password !== confirmPassword)
    return res.status(400).json({errorMessage: "비밀번호달라요"});

  const existUser = await UserSchema.findOne({nickname: nickname});
  if (existUser)
    return res.status(400).json({errorMessage: "중복된 닉네임입니당"});

  await UserSchema.create({
    nickname: nickname,
    password: password,
  });

  res.status(200).json({result:"success"});
});

module.exports = router;
