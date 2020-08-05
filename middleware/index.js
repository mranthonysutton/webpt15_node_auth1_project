const db = require("../data/dbConfig");
const Users = require("../models/user-model");

const userNameExists = async (req, res, next) => {
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

module.exports = { userNameExists, validateUser };
