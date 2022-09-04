import DataAPI from '../../../common/api/DataAPI';
import UserStatistic from '../../../common/api/models/UserStatistic.model';
import { AppState } from '../../../common/stateTypes';
import { LongStat } from '../Stat.model';

export default class StatisticModel {
  private state: AppState;

  private data: UserStatistic | undefined;

  private date = '';

  constructor(state: AppState) {
    this.state = state;
    this.date = this.timeStampToDateStr(Date.now());
  }

  private timeStampToDateStr = (timeStamp: number) => {
    const date = new Date(timeStamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  };

  private padZeroesDateStr = (dateStr: string) => {
    const tmpArr = dateStr.split('.');
    return `${tmpArr[0].padStart(2, '0')}.${tmpArr[1].padStart(2, '0')}.${tmpArr[2]}`;
  };

  public loadData = async () => {
    const data = await DataAPI.getUserStatistic(this.state.authorization.token, this.state.authorization.userId);
    if (!data.status) {
      this.data = data;
    }
  };

  public getShortGamesStat = () => {
    const res = {
      date: this.timeStampToDateStr(Date.now()),
      sprint: { newWords: 0, correctPercent: 0, correctChain: 0 },
      audioCall: { newWords: 0, correctPercent: 0, correctChain: 0 },
    };
    if (this.data) {
      const todayDate = this.padZeroesDateStr(this.data.optional.dailyStat.todayDate);
      if (this.date === todayDate) {
        let gameData = this.data.optional.dailyStat.sprint;
        res.sprint.newWords = gameData.newWords;
        let correctAnswers = gameData.correctAnswers;
        let incorrectAnswers = gameData.incorrectAnswers;
        let correctPercent = Math.floor((correctAnswers / (correctAnswers + incorrectAnswers)) * 100);
        res.sprint.correctPercent = correctPercent | 0;
        res.sprint.correctChain = gameData.mostLongCorrectChain;
        gameData = this.data.optional.dailyStat.audioCall;
        res.audioCall.newWords = gameData.newWords;
        correctAnswers = gameData.correctAnswers;
        incorrectAnswers = gameData.incorrectAnswers;
        correctPercent = Math.floor((correctAnswers / (correctAnswers + incorrectAnswers)) * 100);
        res.audioCall.correctPercent = correctPercent | 0;
        res.audioCall.correctChain = gameData.mostLongCorrectChain;
      }
    }
    return res;
  };

  public getShortWordsStat = () => {
    const res = {
      date: this.timeStampToDateStr(Date.now()),
      newWords: 0,
      learnedWords: 0,
      correctPercent: 0,
    };
    if (this.data) {
      const todayDate = this.padZeroesDateStr(this.data.optional.dailyStat.todayDate);
      if (this.date === todayDate) {
        const wordsData = this.data.optional.dailyStat;
        res.newWords = wordsData.newWords;
        res.learnedWords = wordsData.learnedWords;
        const correctAnswers = wordsData.correctAnswers;
        const incorrectAnswers = wordsData.incorrectAnswers;
        const correctPercent = Math.floor((correctAnswers / (correctAnswers + incorrectAnswers)) * 100);
        res.correctPercent = correctPercent | 0;
      }
    }
    return res;
  };

  public getLongStat = () => {
    const res: LongStat = {};
    if (this.data) {
      for (const key in this.data.optional) {
        if (Object.prototype.hasOwnProperty.call(this.data.optional, key) && key !== 'dailyStat') {
          Object.assign(res, {
            [this.padZeroesDateStr(key)]: {
              newWords: this.data.optional[key].newWords,
              learnedWords: this.data.optional[key].learnedWords,
            },
          });
        }
      }
    }
    return res;
  };
}
