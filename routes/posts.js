const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post.js");

router.get("/", async (req, res) => {
  const posts = await postSchema.find({}).sort("-date");
  const results = posts.map((post) => {
    return {
      title: title,
      writer: writer,
      date: date,
    };
  });
  res.json({posts: results});
});

module.exports = router;
