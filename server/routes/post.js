const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const Post = require("../models/Post");

// @route POST api/posts
// @desc Create post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url:
        url.startsWith("https://") || url.startsWith("http://")
          ? url
          : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts
// @desc Get posts
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route Put api/:postId
// @desc Update post
// @access Private

router.put("/:postId", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url:
        (url.startsWith("https://") || url.startsWith("http://")
          ? url
          : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.postId, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorizsed to update post or post not found
    if (!updatedPost) {
      res.status(401).json({
        success: false,
        message: "Post not found or User not authorized",
      });
    }
    res.json({
      success: true,
      message: "Excellent progress",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "Internal server error" });
  }
});

// @roue DELETE api/posts
// @desc delete post
// @access Private

router.delete("/:postId", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.postId, user: req.userId };

    deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorizsed to delete post or post not found
    if (!deletedPost) {
      res.status(401).json({
        success: false,
        message: "Post not found or User not authorized",
      });
    }
    res.json({
      success: true,
      message: "Excellent progress",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
