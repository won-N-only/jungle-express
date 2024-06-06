const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = require("../schemas/user.js");
const {route} = require("./comments.js");

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

  console.log("가입 시도  ");
  const nickErr = validateNickname(nickname);
  if (nickErr) return res.status(400).json({errorMessage: nickErr});

  const pwdErr = validatePassword(password, nickname);
  if (pwdErr) return res.status(400).json({errorMessage: pwdErr});

  if (password !== confirmPassword)
    return res.status(400).json({errorMessage: "비밀번호달라요"});

  const existUser = await UserSchema.findOne({nickname: nickname});
  if (existUser)
    return res.status(400).json({errorMessage: "중복된 닉네임입니당"});

  const hashedPassword = await bcrypt.hash(password, 12);
  await UserSchema.create({
    nickname: nickname,
    password: hashedPassword,
  });
  console.log("가입 성공  ");

  res.status(200).json({result: "success"});
});

/** 로그인 */
const secretKey = "아잠온다집에가고싶다";
router.post("/login", async (req, res) => {
  const {nickname, password} = req.body;

  console.log("로그인 시도 중 ");
  const nicknameCheck = await UserSchema.findOne({nickname: nickname});

  if (!nicknameCheck || !bcrypt.compare(password, nicknameCheck.password))
    return res.status(400).json({errorMessage: "닉네임 패스워드 확인부탁"});

  const token = jwt.sign({nickname: nickname}, secretKey, {expiresIn: "30m"});
  console.log("로그인 성공 ");

  res
    .cookie("authorization", `bearer ${token}`)
    .status(200)
    .json({token, result: "success"});
});

module.exports = router;
