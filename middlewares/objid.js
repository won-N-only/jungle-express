const mongoose = require("mongoose");

module.exports.postId = (req, res, next) => {
  const {postId} = req.params;
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({errMessage: "object id가 이상함"});
  }
  next();
};
module.exports.commentId = (req, res, next) => {
  const {postId} = req.params;
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({errMessage: "object id가 이상함"});
  }
  next();
};
