const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const question = {
    question: "Is this a question?",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  };

  res.json(question);
});

module.exports = router;
