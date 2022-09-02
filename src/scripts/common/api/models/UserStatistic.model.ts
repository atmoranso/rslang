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
  todayDate: string;
  sprint: DailyGameStat;
  audioCall: DailyGameStat;
}

interface totalDayStat {
  newWords: number;
  learnedWords: number;
}
interface UserStatistic {
  id?: string;
  learnedWords: number;
  optional: {
    dailyStat: DailyStat;
    [key: string]: totalDayStat;
  };
}

export default UserStatistic;
