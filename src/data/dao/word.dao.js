const { tables, getKnexInstance } = require("../index.data");

const getRandWord = async () => {
  const knex = getKnexInstance();
  const word = await knex(tables.words).select().orderByRaw("RANDOM()").limit(1);
  // get 3 random words
  const wrong = await knex(tables.words).select().orderByRaw("RANDOM()").limit(3);

  const question = {
    id: word[0].id,
    word: word[0].norwegian,
    // shuffle the array
    answers: [word[0].dutch, wrong[0].dutch, wrong[1].dutch, wrong[2].dutch].sort(
      () => Math.random() - 0.5
    ),
  };
  return question;
};

module.exports = {
  getRandWord,
};
