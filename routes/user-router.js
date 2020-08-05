const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/user-model");
const { userNameExists, validateUser } = require("../middleware/index");

router.get("/users", async (req, res, next) => {
  try {
    res.json(await Users.allUsers());
  } catch (error) {
    next(error);
  }
});

router.post("/register", userNameExists, async (req, res, next) => {
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

router.get("/user/:id", validateUser, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
