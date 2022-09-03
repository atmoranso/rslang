// import UserStatistic from '../../../common/api/models/UserStatistic.model';

export const userStat = {
  learnedWords: 0,
  optional: {
    dailyStat: {
      newWords: 0,
      learnedWords: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      todayDate: '',
      sprint: {
        newWords: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        mostLongCorrectChain: 0,
      },
      audioCall: {
        newWords: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        mostLongCorrectChain: 0,
      },
    },
  },
};
