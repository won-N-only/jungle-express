const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

router.get("/", async (req, res) => {
  const posts = await postSchema.find({}).sort("-date");
  res.json({posts});
});

module.exports = router;
