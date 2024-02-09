const { tables } = require("../index.data");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tables.words, (table) => {
    table.uuid("id").primary();
    table.string("norwegian").notNullable();
    table.string("dutch").notNullable();
    table.string("type").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tables.words);
};
