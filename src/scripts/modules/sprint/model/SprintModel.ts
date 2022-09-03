import DataAPI from '../../../common/api/DataAPI';
import ErrorRes from '../../../common/api/models/ErrorRes';
import UserWord from '../../../common/api/models/UserWord.model';
import UserWordExt from '../../../common/api/models/UserWordExt.model';
import YesNo from '../../../common/enums';
import { AppState, Authorization, SprintState, Textbook } from '../../../common/stateTypes';
import StatsHelper from '../../../common/StatsHelper';

export default class SprintModel {
  state: SprintState;

  statsHelper: StatsHelper;

  textBookState: Textbook;

  authorization: Authorization;

  constructor(state: AppState) {
    this.state = state.sprint;
    this.textBookState = state.textbook;
    this.authorization = state.authorization;
    this.statsHelper = new StatsHelper('sprint', state);
  }

  async prepareData(showLoadingPage: () => void) {
    if (this.state.gameWords.length > 1) {
    } else {
      showLoadingPage();
      const promiseArr = [];
      const randPages: number[] = [];
      for (let i = 0; i < 5; i++) {
        const pageNumber = Math.floor(Math.random() * 20);
        if (!randPages.includes(pageNumber)) promiseArr.push(this.getWordsArr(this.state.group, pageNumber));
        else i--;
      }

      const gameWordsArr = await Promise.all(promiseArr);
      gameWordsArr.forEach((wordsArr) => {
        this.state.gameWords = this.state.gameWords.concat(wordsArr);
      });
    }
    this.resetGameState();
    this.statsHelper.resetUserStat('sprint');
  }

  resetGameState = () => {
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
    this.state.score = 0;
    this.state.currentWordIndex = -1;
    this.state.isGameFinished = false;
    this.state.correctAnswerCount = 0;
    this.state.correctAnswerCountTotal = 0;
    this.state.wordsCorrectIds = [];
    this.state.wordsInCorrectIds = [];
    this.state.currentWordRu = '';
    this.state.newWords = 0;
    this.state.gameLearnedWords = 0;
  };

  getWordsArr = async (group: number, pageNumber: number) => {
    const response = await DataAPI.getChunkOfWords(group, pageNumber);
    if ('status' in response) {
      throw new Error(response.status + '  ' + response.statusText);
    }
    return response;
  };

  setLevel = (level: number) => {
    this.state.group = level;
  };

  setStartTimer = async (seconds: number, updateCounter: (digit: number) => void) => {
    const startTimer = seconds;
    updateCounter(seconds);
    seconds--;
    const promise = await new Promise((resolve) => {
      const timerId = setInterval(() => {
        updateCounter(seconds);
        seconds--;
        if (seconds < 0) {
          clearInterval(timerId);
          updateCounter(startTimer);
          resolve('result');
        }
      }, 1000);
    });
    return promise;
  };

  setNextWord(updateView: (state: SprintState) => void) {
    this.state.currentWordIndex++;
    if (this.state.currentWordIndex === this.state.gameWords.length - 1) {
      this.state.isGameFinished = true;
    }
    this.state.currentWordRu = this.getWordTranslate();
    updateView(this.state);
  }

  getWordTranslate() {
    if (Math.floor(Math.random() * 2)) return this.state.gameWords[this.state.currentWordIndex].wordTranslate;
    else {
      const index = Math.floor(Math.random() * this.state.gameWords.length);
      return this.state.gameWords[index].wordTranslate;
    }
  }

  checkAnswer(answer: boolean) {
    const condition1 =
      answer && this.state.gameWords[this.state.currentWordIndex].wordTranslate === this.state.currentWordRu;
    const condition2 =
      !answer && this.state.gameWords[this.state.currentWordIndex].wordTranslate !== this.state.currentWordRu;
    if (condition1 || condition2) this.doAnswerCorrect();
    else this.doAnswerIncorrect();
  }

  doAnswerCorrect() {
    this.state.wordsCorrectIds.push(this.state.gameWords[this.state.currentWordIndex].id);
    this.state.correctAnswerCountTotal++;
    this.statsHelper.setMostLongCorrectChain('sprint');

    this.setWordStat(this.state.gameWords[this.state.currentWordIndex].id, true);

    this.state.score += 10 * this.state.speedSprint;
    if (this.state.correctAnswerCount === 3) {
      this.state.speedSprint = this.state.speedSprint < 8 ? this.state.speedSprint * 2 : 8;
      this.state.speedIconCount++;
      this.state.correctAnswerCount = 0;
    } else this.state.correctAnswerCount++;
  }

  doAnswerIncorrect() {
    this.state.correctAnswerCountTotal = 0;
    this.state.correctAnswerCount = 0;
    this.state.wordsInCorrectIds.push(this.state.gameWords[this.state.currentWordIndex].id);
    this.setWordStat(this.state.gameWords[this.state.currentWordIndex].id, false);
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
  }

  setWordStat = (wordId: string, isAnswerCorrect: boolean) => {
    if (this.authorization.isAuth) {
      const userWord = DataAPI.getUserWord(
        this.authorization.token,
        this.authorization.userId,
        this.state.gameWords[this.state.currentWordIndex].id,
      );

      userWord.then((response: UserWordExt | ErrorRes) => {
        if ('status' in response) {
          if (response.status == 404) {
            DataAPI.createUserWord(
              this.authorization.token,
              this.authorization.userId,
              wordId,
              this.createUserWord(isAnswerCorrect),
            );
          }
        } else {
          DataAPI.updateUserWord(
            this.authorization.token,
            this.authorization.userId,
            wordId,
            this.updateUserWord(response, isAnswerCorrect),
          );
        }
      });
    }
  };

  updateUserWord = (userWordExt: Partial<UserWordExt>, isAnswerCorrect: boolean) => {
    delete userWordExt.id;
    delete userWordExt.wordId;
    const userWord = userWordExt as UserWord;

    const sprintStat = userWord.optional.gamesStatistic.sprint;
    if (isAnswerCorrect) {
      sprintStat.correct++;
      sprintStat.correctChain++;
      sprintStat.lastUpdate = Date.now();
      if (
        (sprintStat.correctChain === 3 && userWord.difficulty === YesNo.no) ||
        (sprintStat.correctChain === 5 && userWord.difficulty === YesNo.yes)
      ) {
        userWord.difficulty = YesNo.no;
        userWord.optional.learned = YesNo.yes;
        this.state.gameLearnedWords++;
      }
    } else {
      sprintStat.wrong++;
      sprintStat.correctChain = 0;
      sprintStat.lastUpdate = Date.now();
      userWord.optional.learned = YesNo.no;
    }
    userWord.optional.gamesStatistic.sprint = sprintStat;
    return userWord;
  };

  createUserWord = (isAnswerCorrect: boolean) => {
    this.state.newWords++;
    const userWord: UserWord = {
      difficulty: YesNo.no,
      optional: {
        learned: YesNo.no,
        learnedDate: 0,
        gamesStatistic: {
          wasInGames: true,
          sprint: {
            correct: isAnswerCorrect ? 1 : 0,
            wrong: isAnswerCorrect ? 0 : 1,
            correctChain: isAnswerCorrect ? 1 : 0,
            lastUpdate: Date.now(),
          },
          audioCall: {
            correct: 0,
            wrong: 0,
            correctChain: 0,
            lastUpdate: 0,
          },
        },
      },
    };
    return userWord;
  };

  finishGame = (showFinishPage: (state: SprintState) => void) => {
    if (this.authorization.isAuth) {
      this.statsHelper.manageStats('sprint');
    }

    showFinishPage(this.state);
  };
}
