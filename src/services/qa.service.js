const { getRandWord } = require("../data/dao/word.dao");

const getOneQuestionWithAnswers = async () => {
  const question = await getRandWord();
  return question;
};

module.exports = {
  getOneQuestionWithAnswers,
};
