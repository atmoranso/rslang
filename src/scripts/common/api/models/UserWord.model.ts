import YesNo from '../../enums';

interface GameStatistic {
  correct: number;
  wrong: number;
  correctChain: number;
  lastUpdate: number;
}

interface UserWord {
  difficulty: YesNo;
  optional: {
    learned: YesNo;
    learnedDate: number;
    gamesStatistic: {
      wasInGames: boolean;
      sprint: GameStatistic;
      audioCall: GameStatistic;
    };
  };
}

export default UserWord;
