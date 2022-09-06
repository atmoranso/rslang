import DataAPI from '../../../common/api/DataAPI';
import ErrorRes from '../../../common/api/models/ErrorRes';
import UserWord from '../../../common/api/models/UserWord.model';
import UserWordExt from '../../../common/api/models/UserWordExt.model';
import Word from '../../../common/api/models/Word.model';
import YesNo from '../../../common/enums';
import { AppState, AudioCallState, Authorization, Textbook } from '../../../common/stateTypes';
import StatsHelper from '../../../common/StatsHelper';

export default class AudioCallModel {
  state: AudioCallState;

  isNoWords = false;

  statsHelper: StatsHelper;

  textBookState: Textbook;

  authorization: Authorization;

  isPLaying = false;

  constructor(state: AppState) {
    this.state = state.audioCall;
    this.textBookState = state.textbook;
    this.authorization = state.authorization;
    this.statsHelper = new StatsHelper('audioCall', state);
  }

  checkIsBeforeTextbook = () => {
    return this.state.isFromTextBook;
  };

  async prepareData(showLoadingPage: () => void) {
    if (this.state.gameWords.length > 1 && !this.state.isFromTextBook) {
    } else {
      showLoadingPage();
      const promiseArr = [];
      const randPages: number[] = [];
      this.state.gameWords = [];
      if (this.state.isFromTextBook) {
        const currGroup = this.textBookState.group - 1;
        const currPage = this.textBookState.page - 1;
        promiseArr.push(this.getWordsArr(currGroup, currPage));
        if (currPage > 0) {
          for (let i = currPage - 1, k = 1; i >= 0; i--, k++) {
            if (k > 4) break;
            promiseArr.push(this.getWordsArr(currGroup, i));
          }
        }
      } else {
        for (let i = 0; i < 5; i++) {
          const pageNumber = Math.floor(Math.random() * 20);
          if (!randPages.includes(pageNumber)) promiseArr.push(this.getWordsArr(this.state.group, pageNumber));
          else i--;
        }
      }

      const gameWordsArr = await Promise.all(promiseArr);
      let allGameWords: Word[] = [];
      gameWordsArr.forEach((wordsArr) => {
        allGameWords = allGameWords.concat(wordsArr);
      });
      if (this.authorization.isAuth) this.state.gameWords = (await this.filterNewWords(allGameWords)).splice(0, 10);
      else this.state.gameWords = allGameWords.splice(0, 10);
      this.state.gameWords.forEach((word) => {
        word.audio = DataAPI.baseURL + word.audio;
        word.image = DataAPI.baseURL + word.image;
      });
    }
    if (this.state.gameWords.length === 0) this.isNoWords = true;
    this.resetGameState();
    this.statsHelper.resetUserStat('audioCall');
  }

  resetGameState = () => {
    this.state.currentWordIndex = -1;
    this.state.isGameFinished = false;
    this.state.correctAnswerCountTotal = 0;
    this.state.wordsCorrectIds = [];
    this.state.wordsInCorrectIds = [];
    this.state.currentWordRu = [];
    this.state.newWords = 0;
    this.state.gameLearnedWords = 0;
  };

  getAllUserWords = async () => {
    const getUserWords = await DataAPI.getUserWords(this.authorization.token, this.authorization.userId);

    return getUserWords;
  };

  filterNewWords = async (allGameWords: Word[]) => {
    const allUserWords: UserWordExt[] = await this.getAllUserWords();
    const userWordsFilteredIds = allUserWords
      .filter((word) => word.optional.learned === YesNo.yes)
      .map((word) => word.wordId);
    const filteredGameWords = allGameWords.filter((word) => !userWordsFilteredIds.includes(word.id));
    return filteredGameWords;
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

  setStartTimer = async (isStartTimer: boolean, seconds: number, updateCounter: (digit: number) => void) => {
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
          resolve('timeout');
        }
        if (!isStartTimer && this.state.isGameFinished) {
          resolve('noWords');
        }
      }, 1000);
    });
    return promise;
  };

  setNextWord(updateView: (state: AudioCallState) => void) {
    this.state.currentWordIndex++;

    if (this.state.currentWordIndex === this.state.gameWords.length - 1) {
      this.state.isGameFinished = true;
    }
    this.state.currentWordRu = [];
    this.state.currentWordRu.push(this.state.gameWords[this.state.currentWordIndex].wordTranslate);
    console.log(this.state.gameWords.length);

    for (let i = 0; i < 4; i++) {
      const pageNumber = Math.floor(Math.random() * this.state.gameWords.length);
      if (!this.state.currentWordRu.includes(this.state.gameWords[pageNumber].wordTranslate))
        this.state.currentWordRu.push(this.state.gameWords[pageNumber].wordTranslate);
      else i--;
    }
    this.shuffleArray(this.state.currentWordRu);
    updateView(this.state);
  }

  shuffleArray = (array: string[]) => {
    array.sort(() => Math.random() - 0.5);
  };

  playPauseWord = (play: (play: boolean) => void) => {
    if (this.isPLaying) {
      this.isPLaying = false;
      play(false);
    } else {
      this.isPLaying = true;
      play(true);
    }
  };

  getWordTranslate() {
    if (Math.floor(Math.random() * 2)) return this.state.gameWords[this.state.currentWordIndex].wordTranslate;
    else {
      const index = Math.floor(Math.random() * this.state.gameWords.length);
      return this.state.gameWords[index].wordTranslate;
    }
  }

  checkAnswer(showAnswer: (correctAnswerNum: number, pressed: number, state: AudioCallState) => void, answer: number) {
    const condition =
      answer &&
      this.state.gameWords[this.state.currentWordIndex].wordTranslate === this.state.currentWordRu[answer - 1];

    if (condition) this.doAnswerCorrect();
    else this.doAnswerIncorrect();
    const corrAnswerNum = this.state.currentWordRu.indexOf(
      this.state.gameWords[this.state.currentWordIndex].wordTranslate,
    );
    showAnswer(corrAnswerNum + 1, answer, this.state);
  }

  doAnswerCorrect() {
    this.state.wordsCorrectIds.push(this.state.gameWords[this.state.currentWordIndex].id);
    this.state.correctAnswerCountTotal++;
    this.statsHelper.setMostLongCorrectChain('audioCall');
    this.setWordStat(this.state.gameWords[this.state.currentWordIndex].id, true);
  }

  doAnswerIncorrect() {
    this.state.correctAnswerCountTotal = 0;
    this.state.wordsInCorrectIds.push(this.state.gameWords[this.state.currentWordIndex].id);
    this.setWordStat(this.state.gameWords[this.state.currentWordIndex].id, false);
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

    const AudioCallStat = userWord.optional.gamesStatistic.audioCall;
    if (isAnswerCorrect) {
      AudioCallStat.correct++;
      AudioCallStat.correctChain++;
      AudioCallStat.lastUpdate = Date.now();
      if (
        (AudioCallStat.correctChain === 3 && userWord.difficulty === YesNo.no) ||
        (AudioCallStat.correctChain === 5 && userWord.difficulty === YesNo.yes)
      ) {
        userWord.difficulty = YesNo.no;
        userWord.optional.learned = YesNo.yes;
        this.state.gameLearnedWords++;
      }
    } else {
      AudioCallStat.wrong++;
      AudioCallStat.correctChain = 0;
      AudioCallStat.lastUpdate = Date.now();
      userWord.optional.learned = YesNo.no;
    }
    userWord.optional.gamesStatistic.audioCall = AudioCallStat;
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
            correct: 0,
            wrong: 0,
            correctChain: 0,
            lastUpdate: 0,
          },
          audioCall: {
            correct: isAnswerCorrect ? 1 : 0,
            wrong: isAnswerCorrect ? 0 : 1,
            correctChain: isAnswerCorrect ? 1 : 0,
            lastUpdate: Date.now(),
          },
        },
      },
    };
    return userWord;
  };

  finishGame = (showFinishPage: (state: AudioCallState) => void) => {
    if (this.authorization.isAuth) {
      this.statsHelper.manageStats('audioCall');
    }

    showFinishPage(this.state);
  };
}
