const Post = require("../models/Post");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// @@
// POST
const createNewPost = async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  // JWT
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;

    const { title, summary, content } = req.body;

    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(post);
  });
};

// @@
// GET
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
};

// @@
// GET
const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("author", ["username"]);
  res.json(post);
};

// @@
// PUT
const updatePost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  // JWT
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summary, content } = req.body;

    const post = await Post.findById(id);
    const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: newPath ? newPath : post.cover,
    });

    res.json(updatedPost);
  });
};

module.exports = { createNewPost, getAllPosts, getPost, updatePost };
