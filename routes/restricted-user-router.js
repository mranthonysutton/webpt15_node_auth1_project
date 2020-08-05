const express = require("express");
const router = express.Router();
const Users = require("../models/user-model");
const { validateUser, sessionIDMatchesParams } = require("../middleware/index");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Users.allUsers());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", sessionIDMatchesParams, validateUser, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
