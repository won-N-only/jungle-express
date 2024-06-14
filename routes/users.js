const express = require("express");
const router = express.Router();
const UserService = new (require("../services/userService.js"))();

/** 회원가입 */
router.post("/", async (req, res) => {
  const {nickname, password, confirmPassword} = req.body;
  console.log("가입 시도  ");
  const nickErr = UserService.validateNickname(nickname);
  const pwdErr = UserService.validatePassword(
    password,
    nickname,
    confirmPassword
  );

  if (nickErr || pwdErr) {
    const err = nickErr || pwdErr;
    return res.status(400).json({err});
  }

  const existUser = await UserService.findUser(nickname);
  if (existUser)
    return res.status(400).json({errorMessage: "중복된 닉네임입니당"});

  try {
    const user = await UserService.createUser(nickname, password);
    console.log("가입 성공  ");

    res.status(200).json({user, result: "success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({errorMessage: "가입실패 ㄲㅂ "});
  }
});

/** 로그인 */
router.post("/login", async (req, res) => {
  const {nickname, password} = req.body;

  console.log("로그인 시도 중 ");
  const findUser = await UserService.findUser(nickname);

  if (!findUser || !UserService.comparePassword(password, findUser.password))
    return res.status(400).json({errorMessage: "닉네임 패스워드 확인부탁"});

  try {
    const token = UserService.tokenizeNickname(nickname);
    console.log("로그인 성공 ");

    res.status(200).json({result: "success", token: token});
  } catch (err) {
    console.error(err);
    res.status(400).json({errorMessage: "로그인 실패 ㅜㅜ"});
  }
});

module.exports = router;
