import YesNo from "../../enums";

interface gameStatistic {
  correct: number,
  wrong: number,
  correctChain: number,
  lastUpdate: number,
}

interface UserWord {
  difficulty: YesNo;
  optional: {
    learned: YesNo;
    learnedDate: number;
    gamesStatistic: {
      wasInGames: boolean,
      sprint: gameStatistic,
      audioCall: gameStatistic
    }
  };
}

export default UserWord;
