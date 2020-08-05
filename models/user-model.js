const db = require("../data/dbConfig");

function allUsers() {
  return db("users").select("id", "username");
}

function findOneBy(filter) {
  return db("users").where(filter).first();
}

function findManyBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findOneBy({ id });
}

module.exports = { allUsers, findOneBy, findManyBy, add };
