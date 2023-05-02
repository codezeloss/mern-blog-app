const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  logout,
} = require("../controllers/usersController");
const {
  createNewPost,
  getAllPosts,
  getPost,
  updatePost,
} = require("../controllers/postsController");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(getProfile);
router.route("/logout").post(logout);

router.route("/new-post").post(uploadMiddleware.single("file"), createNewPost);
router.route("/posts").get(getAllPosts);
router.route("/post/:id").get(getPost);
router.route("/post").put(uploadMiddleware.single("file"), updatePost);

module.exports = router;
