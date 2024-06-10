const jwt = require("jsonwebtoken");
const config = require("../config/index.js");

/** 로그인 확인 미들웨어 */
const secretKey = config.secretKey;
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);

  const [type, token] = (authorization ?? "").split(" ");
  console.log(token);
  console.log(type);

  if (!token || type !== "Bearer")
    return res.status(400).json({errorMessage: " 로그인 제대로 한것 맞니?"});

  try {
    const {nickname} = jwt.verify(token, secretKey);
    res.locals.nickname = nickname;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({errorMessage: "로그인 하십셔"});
  }
};
