const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("./dbConfig");
const UserRouter = require("../routes/user-router");
const RestricedUserRouter = require("../routes/restricted-user-router");
const { sessionRequired } = require("../middleware/index");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
    store: new KnexSessionStore({
      knex: db,
      createTable: true,
      clearInterval: 1000 * 60 * 30, // 30 minutes
    }),

    // Setting the cookie allowed us to be able to view the data.
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true,
    },
  })
);

server.use("/api/", UserRouter);
server.use("/api/users/", sessionRequired, RestricedUserRouter);

server.use("/", (req, res) => {
  res.json({ api: "🚀 Up and running... 🚀" });
});

server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = server;
