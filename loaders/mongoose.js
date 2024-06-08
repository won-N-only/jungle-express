const mongoose = require("mongoose");
const config = require("../config/index");

module.exports = async () => {
  await mongoose.connect(config.mongoURI);
  console.log("MongoDB 연결 성공!");
};
