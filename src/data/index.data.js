const knex = require("knex");
require("dotenv").config();

let knexInstance;
const isDev = process.env.NODE_ENV === "development";

const initializeKnex = async () => {
  const options = {
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DB_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      directory: "./src/data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
  };

  // 1. Attempt direct connection to verify database existence:
  try {
    const knexInstance = knex(options);
    await knexInstance.raw("SELECT 1;"); // Simple query to validate connection and existence
    console.log("Database already exists, proceeding with migrations and seeds...");

    // 2. (Optional) Perform migrations and seeding in development, or conditionally based on flag:
    if (isDev) {
      await knexInstance.migrate.latest();
      await knexInstance.seed.run();
    } else {
      console.log("Skipping migrations and seeds in production environment.");
    }
  } catch (err) {
    // 3. Database doesn't exist: handle the error gracefully and create it using a separate connection
    console.error("Database doesn't exist:", err.message);

    // Create a new connection with minimal config to create the database:
    const createDbKnex = knex({
      client: process.env.DATABASE_CLIENT,
      connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DB_USER,
        password: process.env.DATABASE_PASSWORD,
      },
    });

    try {
      await createDbKnex.raw(`CREATE DATABASE ${process.env.DATABASE_NAME};`);
      console.log("Database created successfully.");

      // Create a new Knex instance with full config to continue operations:
      const fullKnexInstance = knex(options);
      await fullKnexInstance.migrate.latest();
      await fullKnexInstance.seed.run();
      knexInstance = fullKnexInstance; // Assign to global variable
    } catch (createDbErr) {
      console.error("Database creation failed:", createDbErr.message);
      // Handle or recover from creation error appropriately
    } finally {
      createDbKnex.destroy(); // Close separate connection
    }
  }
};

const getKnexInstance = () => {
  if (!knexInstance) {
    throw new Error("Knex instance not found");
  }
  return knexInstance;
};

const tables = Object.freeze({
  words: "words",
});

module.exports = {
  getKnexInstance,
  tables,
  initializeKnex,
};
