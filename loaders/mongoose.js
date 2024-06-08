const mongoose = require("mongoose");
const config = require("../config/index");

module.exports = async () => {
  await mongoose.connect(config.mongoURI).catch((err) => console.error(err));
  console.log("MongoDB 연결 성공!");

  mongoose.connection.on("error", (err) => {
    console.error("몽고디비 연결 에러났어요 ", err);
  });
};
