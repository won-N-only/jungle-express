const userSchema = require("../schemas/user.js");
const jwt = require("jsonwebtoken");

/** 로그인 확인 미들웨어 */
const secretKey = "아잠온다집에가고싶다";
module.exports = async (req, res, next) => {
  const {authorization} = req.cookies;
  const [type, token] = (authorization ?? "").split(" ");

  if (!token || type !== "Bearer")
    return res.status(400).json({errorMessage: " 로그인 제대로 한것 맞니?"});

  try {
    const {nickname} = jwt.verify(token, secretKey);
    const user = await userSchema.findOne({nickname: nickname});
    res.locals.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({errorMessage: "로그인 하십셔"});
  }
};
