const express = require("express");
const questionService = require("../services/qa.service");

const router = express.Router();

const GetOneQuestion = async (req, res) => {
  try {
    const question = await questionService.getOneQuestionWithAnswers();
    res.json(question);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/", GetOneQuestion);

module.exports = router;
