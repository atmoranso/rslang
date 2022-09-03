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

interface TotalDayStat {
  newWords: number;
  learnedWords: number;
}
interface UserStatistic {
  id?: string;
  learnedWords: number;
  optional: {
    dailyStat: DailyStat;
    [key: string]: TotalDayStat;
  };
}

export default UserStatistic;
