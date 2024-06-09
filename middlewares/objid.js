const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const {id} = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({errMessage: "object id가 이상함"});
  }
  next();
};

module.exports.posts = validateObjectId;
module.exports.comments = validateObjectId;
