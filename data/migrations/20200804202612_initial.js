exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned();
    table.text("username").notNullable().unique();
    table.text("password").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
