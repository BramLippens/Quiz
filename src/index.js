require("dotenv").config();

const express = require("express");

// Import the router from controllers
const router = require("./controllers");

const app = express();

// Set the port to the environment variable PORT, or default to 3000
const port = process.env.PORT || 3000;

// Add the router to the /api endpoint
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
