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
    totalStat: Record<number, Record<number, totalDayStat>>;
  };
}

export default UserStatistic;
