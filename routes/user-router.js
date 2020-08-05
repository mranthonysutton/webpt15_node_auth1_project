const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/user-model");
const {
  usernameAlreadyExists,
  validateUsername,
} = require("../middleware/index");

router.post("/register", usernameAlreadyExists, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 12),
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateUsername, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordValid = await bcrypt.compare(password, req.user.password);

    if (!passwordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    req.session.user = req.user;
    res.json({ message: `Welcome ${req.user.username}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
