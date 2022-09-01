enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

interface DailyGameStat {
  newWords: number;
  correctAnswers: number;
  incorrectAnswers: number;
  mostLongCorrectChain: number;
}
interface DailyStat {
  newWords: number;
  learnedWords: number;
  correctAnswers: number;
  incorrectAnswers: number;
  sprint: DailyGameStat;
  audioCall: DailyGameStat;
}

interface totalDayStat {
  newWords: number;
  learnedWords: number;
}
interface UserStatistic {
  learnedWords: number;
  optional: {
    dailyStat: DailyStat;
    totalStat: Record<Month, Record<number, totalDayStat>>;
  };
}

export default UserStatistic;
