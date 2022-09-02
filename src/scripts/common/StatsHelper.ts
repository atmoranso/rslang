import { AppState, SprintState } from './stateTypes';
import { userStat } from './userStatHolder';

export default class StatsHelper {
  state: SprintState;

  constructor(state: AppState) {
    this.state = state.sprint;
  }

  setNewUserStat = () => {
    const dateObj = new Date();
    const dateField = dateObj.getDate() + '.' + dateObj.getMonth() + '.' + dateObj.getFullYear();
    userStat.optional.dailyStat.newWords = this.state.newWords;
    userStat.optional.dailyStat.learnedWords = this.state.gameLearnedWords;
    userStat.optional.dailyStat.correctAnswers = this.state.wordsCorrectIds.length;
    userStat.optional.dailyStat.incorrectAnswers = this.state.wordsInCorrectIds.length;

    // userStat.optional.totalStat[date.getMonth()][date.getDate()].newWords = 1;
    userStat.optional.dailyStat.sprint.newWords = this.state.newWords;
    userStat.optional.dailyStat.sprint.correctAnswers = this.state.wordsCorrectIds.length;
    userStat.optional.dailyStat.sprint.incorrectAnswers = this.state.wordsInCorrectIds.length;

    const totalDayStat = {
      [dateField]: {
        newWords: this.state.newWords,
        learnedWords: this.state.gameLearnedWords,
      },
    };
    const newUserStat = {
      ...userStat,
      ...totalDayStat,
    };
    console.dir(newUserStat);
  };
}
