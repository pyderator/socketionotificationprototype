const express = require("express");
const router = express.Router();
const Posts = require("../Model/posts");
const posts = new Posts();
router.get("/posts", (req, res, next) => {
  res.status(200).json({
    posts: posts.getPosts(),
  });
});

module.exports = router;
