const db = require("../data/dbConfig");
const Users = require("../models/user-model");

const usernameAlreadyExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const userExists = await Users.findOneBy({ username });

    if (userExists)
      return res.status(401).json({ message: "User already exists" });

    next();
  } catch (error) {
    next(error);
  }
};

const validateUser = async (req, res, next) => {
  try {
    const validUser = await Users.findOneBy({ id: req.params.id });

    if (!validUser)
      return res.status(404).json({ message: "User does not exist" });

    req.user = validUser;
    next();
  } catch (error) {
    next(error);
  }
};

const validateUsername = async (req, res, next) => {
  try {
    const userFound = await Users.findOneBy({ username: req.body.username });
    if (!userFound)
      return res.status(401).json({ message: "Invalid credentials" });

    req.user = userFound;
    next();
  } catch (error) {
    next(error);
  }
};

const sessionRequired = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user)
      return res
        .status(401)
        .json({ message: "You are unable to access this resource." });

    next();
  } catch (error) {
    next(error);
  }
};

const sessionIDMatchesParams = (req, res, next) => {
  try {
    const { user } = req.session;
    if (user.id !== Number(req.params.id))
      return res
        .status(401)
        .json({ message: "You are unable to access this resource." });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  usernameAlreadyExists,
  validateUser,
  validateUsername,
  sessionRequired,
  sessionIDMatchesParams,
};
