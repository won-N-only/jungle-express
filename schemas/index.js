const mongoose = require("mongoose");

/** 첫 연결 */
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/JUNGLE-EXPRESS")
    .catch((err) => console.log(err));
};

/** 연결 event handle */
mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러났어요 ", err);
});

module.exports = connect;
