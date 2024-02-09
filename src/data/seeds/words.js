const { randomUUID } = require("crypto");
const { tables } = require("../index.data");
const fs = require("fs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tables.words).del();
  // Read the JSON file
  const jsonData = fs.readFileSync("./src/data/Opgaves.json", "utf8");

  // Parse the JSON data
  const data = JSON.parse(jsonData);

  // only need from each item of the array the norwegian and dutch properties
  const words = data.map((item) => {
    return {
      id: randomUUID(),
      norwegian: item.Woord,
      dutch: item.Oplossing,
      type: item.Type,
    };
  });

  // Inserts seed entries
  await knex(tables.words).insert(words);
};
