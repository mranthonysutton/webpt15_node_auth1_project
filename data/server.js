const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const UserRouter = require("../routes/user-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/", UserRouter);

server.use("/", (req, res) => {
  res.json({ api: "🚀 Up and running... 🚀" });
});

server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = server;
