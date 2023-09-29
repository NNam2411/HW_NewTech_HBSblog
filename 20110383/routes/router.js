const express = require("express");
const {
  getAllPost,
  getDetailPost,
  addPost,
  editPost,
  deletePost,
  getAuthorPost,
} = require("../controllers/postController");
const { postComment } = require("../controllers/commentController");
const router = express.Router();
const { posts } = require("../models/posts");
const { comments } = require("../models/comments");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  console.log(`${req.method} ${req.url}`);
  next();
});

// define the homepage
router.get("/", getAllPost);

// define get Author post
router.get("/author/:author", getAuthorPost);

// define detail post
router.get("/detail/:id", getDetailPost);

// define post comment
router.post("/detail/:id/", postComment);

router.post("/addPost", addPost);

// get all comments
router.get("/comments", (req, res) => {
  res.status(200).json(comments);
});

// Get Edit Post
router.get("/editPost/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    res.render("posts/editPost", { post: post });
  } else {
    res.status(400).json({ error: "No post" });
  }
});
router.post("/editPost/:id", editPost);

router.post("/deletePost/:id", deletePost);

module.exports = router;
