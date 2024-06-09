const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/index.js");
const UserService = new (require("../services/userService.js"))();

/** 회원가입 */
router.post("/", async (req, res) => {
  const {nickname, password, confirmPassword} = req.body;

  console.log("가입 시도  ");
  const nickErr = UserService.validateNickname(nickname);
  if (nickErr) return res.status(400).json({errorMessage: nickErr});

  const pwdErr = UserService.validatePassword(
    password,
    nickname,
    confirmPassword
  );
  if (pwdErr) return res.status(400).json({errorMessage: pwdErr});

  const existUser = await UserService.findUser(nickname);
  if (existUser)
    return res.status(400).json({errorMessage: "중복된 닉네임입니당"});

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserService.createUser(nickname, hashedPassword);
    console.log("가입 성공  ");

    res.status(200).json({user, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "가입실패 ㄲㅂ "});
  }
});

/** 로그인 */
const secretKey = config.secretKey;
router.post("/login", async (req, res) => {
  const {nickname, password} = req.body;

  console.log("로그인 시도 중 ");
  const nicknameCheck = await UserService.findUser(nickname);

  if (!nicknameCheck || !bcrypt.compare(password, nicknameCheck.password))
    return res.status(400).json({errorMessage: "닉네임 패스워드 확인부탁"});

  try {
    const token = jwt.sign({nickname: nickname}, secretKey, {expiresIn: "30m"});
    console.log("로그인 성공 ");

    res
      .cookie("authorization", `Bearer ${token}`)
      .status(200)
      .json({token, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(400).json({errorMessage: "로그인 실패 ㅜㅜ"});
  }
});

module.exports = router;
