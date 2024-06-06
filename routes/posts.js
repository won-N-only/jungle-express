const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

router.get("/", async (req, res) => {
  const posts = await postSchema.find({});
  res.json({posts});
});

module.exports = router;
