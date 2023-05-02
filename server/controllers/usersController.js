const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// @@@
// REGISTER
const register = async (req, res) => {
  const { username, password } = req.body;

  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
// @@@
// LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const comparedPassword = bcrypt.compareSync(password, user.password);

  if (comparedPassword) {
    await jwt.sign(
      { username, id: user._id },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: user._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("Incorrect password");
  }
};

// @@
// PROFILE
const getProfile = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

// @@
// LOGOUT
const logout = async (req, res) => {
  res.cookie("token", "").json("User Logout");
};

module.exports = { register, login, getProfile, logout };
