import DataAPI from '../../../common/api/DataAPI';
import UserStatistic from '../../../common/api/models/UserStatistic.model';
import { AppState } from '../../../common/stateTypes';

export default class StatisticModel {
  private state: AppState;

  private data: UserStatistic | undefined;

  private date = '';

  constructor(state: AppState) {
    this.state = state;
    this.date = this.timeStampToDateStr(Date.now());
  }

  private timeStampToDateStr = (timeStamp: number, format = false) => {
    const date = new Date(timeStamp);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    if (format) {
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');
    }
    return `${day}.${month}.${year}`;
  };

  public loadData = async () => {
    this.data = await DataAPI.getUserStatistic(this.state.authorization.token, this.state.authorization.userId);
  };

  public getShortGamesStat = () => {
    const res = {
      date: this.timeStampToDateStr(Date.now(), true),
      sprint: { newWords: 0, correctPercent: 0, correctChain: 0 },
      audioCall: { newWords: 0, correctPercent: 0, correctChain: 0 },
    };
    if (this.data && this.date === this.data.optional.dailyStat.todayDate) {
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
    return res;
  };
}
