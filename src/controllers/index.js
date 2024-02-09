const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/qa", require("./qa.controller"));

module.exports = router;
