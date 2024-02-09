const getOneQuestionWithAnswers = async () => {
  return {
    question: "Is this a question?",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  };
};

module.exports = {
  getOneQuestionWithAnswers,
};
