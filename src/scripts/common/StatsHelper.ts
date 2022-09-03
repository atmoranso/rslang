import DataAPI from './api/DataAPI';
import ErrorRes from './api/models/ErrorRes';
import UserStatistic from './api/models/UserStatistic.model';
import { AppState, AudioCallState, Authorization, SprintState } from './stateTypes';
import { userStat } from './userStatHolder';

export default class StatsHelper {
  state: SprintState | AudioCallState;

  authorization: Authorization;

  constructor(game: 'sprint' | 'audioCall', state: AppState) {
    this.state = state[game];
    this.authorization = state.authorization;
  }

  setNewUserStat = (game: 'sprint' | 'audioCall') => {
    const dateObj = new Date();
    const dateField = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
    userStat.optional.dailyStat.newWords = this.state.newWords;
    userStat.optional.dailyStat.learnedWords = this.state.gameLearnedWords;
    userStat.optional.dailyStat.correctAnswers = this.state.wordsCorrectIds.length;
    userStat.optional.dailyStat.incorrectAnswers = this.state.wordsInCorrectIds.length;
    userStat.optional.dailyStat.todayDate = dateField;

    userStat.optional.dailyStat[game].newWords = this.state.newWords;
    userStat.optional.dailyStat[game].correctAnswers = this.state.wordsCorrectIds.length;
    userStat.optional.dailyStat[game].incorrectAnswers = this.state.wordsInCorrectIds.length;
    userStat.optional = {
      ...userStat.optional,
      [dateField]: {
        newWords: this.state.newWords,
        learnedWords: this.state.gameLearnedWords,
      },
    };

    const newUserStat: UserStatistic = {
      ...userStat,
    };
    return newUserStat;
  };

  updateUserStat = (game: 'sprint' | 'audioCall', userStatsFromServer: UserStatistic) => {
    const currentUserStat = this.setNewUserStat(game);
    userStatsFromServer.learnedWords += currentUserStat.learnedWords;
    if (userStatsFromServer.optional.dailyStat.todayDate !== currentUserStat.optional.dailyStat.todayDate) {
      userStatsFromServer.optional.dailyStat = currentUserStat.optional.dailyStat;
    } else {
      userStatsFromServer.optional.dailyStat.newWords += currentUserStat.optional.dailyStat.newWords;
      userStatsFromServer.optional.dailyStat.learnedWords += currentUserStat.optional.dailyStat.learnedWords;
      userStatsFromServer.optional.dailyStat.correctAnswers += currentUserStat.optional.dailyStat.correctAnswers;
      userStatsFromServer.optional.dailyStat.incorrectAnswers += currentUserStat.optional.dailyStat.incorrectAnswers;

      userStatsFromServer.optional.dailyStat[game].newWords += currentUserStat.optional.dailyStat[game].newWords;
      userStatsFromServer.optional.dailyStat[game].correctAnswers +=
        currentUserStat.optional.dailyStat[game].correctAnswers;
      userStatsFromServer.optional.dailyStat[game].incorrectAnswers +=
        currentUserStat.optional.dailyStat[game].incorrectAnswers;
      userStatsFromServer.optional.dailyStat[game].mostLongCorrectChain =
        userStatsFromServer.optional.dailyStat[game].mostLongCorrectChain >
        currentUserStat.optional.dailyStat[game].mostLongCorrectChain
          ? userStatsFromServer.optional.dailyStat[game].mostLongCorrectChain
          : currentUserStat.optional.dailyStat[game].mostLongCorrectChain;
    }
    if (currentUserStat.optional.dailyStat.todayDate in userStatsFromServer.optional) {
      userStatsFromServer.optional[currentUserStat.optional.dailyStat.todayDate].newWords +=
        currentUserStat.optional.dailyStat.newWords;
      userStatsFromServer.optional[currentUserStat.optional.dailyStat.todayDate].learnedWords +=
        currentUserStat.optional.dailyStat.learnedWords;
    } else {
      userStatsFromServer.optional = {
        ...userStatsFromServer.optional,
        [currentUserStat.optional.dailyStat.todayDate]: {
          newWords: currentUserStat.optional.dailyStat.newWords,
          learnedWords: currentUserStat.optional.dailyStat.learnedWords,
        },
      };
    }
    return userStatsFromServer;
  };

  setMostLongCorrectChain = (game: 'sprint' | 'audioCall') => {
    userStat.optional.dailyStat[game].mostLongCorrectChain =
      this.state.correctAnswerCountTotal > userStat.optional.dailyStat[game].mostLongCorrectChain
        ? this.state.correctAnswerCountTotal
        : userStat.optional.dailyStat[game].mostLongCorrectChain;
  };

  resetUserStat = (game: 'sprint' | 'audioCall') => {
    userStat.optional.dailyStat[game].mostLongCorrectChain = 0;
  };

  manageStats = async (game: 'sprint' | 'audioCall') => {
    const userStatsFromServer: UserStatistic | ErrorRes = await this.getStatsFromServer();
    if ('status' in userStatsFromServer) {
      if (userStatsFromServer.status == 404) {
        DataAPI.updateUserStatistic(this.authorization.token, this.authorization.userId, this.setNewUserStat(game));
      }
    } else {
      delete userStatsFromServer.id;
      DataAPI.updateUserStatistic(
        this.authorization.token,
        this.authorization.userId,
        this.updateUserStat(game, userStatsFromServer),
      );
    }
  };

  getStatsFromServer = async () => {
    const userStatsFromServer = await DataAPI.getUserStatistic(this.authorization.token, this.authorization.userId);
    return userStatsFromServer;
  };
}
