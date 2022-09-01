import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';
import { AppState, Authorization, SprintState, Textbook } from '../../../common/stateTypes';

export default class SprintModel {
  state: SprintState;

  textBookState: Textbook;

  authorization: Authorization;

  gameWords: Word[] = [];

  constructor(state: AppState) {
    this.state = state.sprint;
    this.textBookState = state.textbook;
    this.authorization = state.authorization;
  }

  async prepareData(showLoadingPage: () => void) {
    if (this.gameWords.length > 1) {
    } else {
      showLoadingPage();
      if (!this.authorization.isAuth) {
        const pageNumber = Math.floor(Math.random() * 20);
        this.gameWords = await this.getWordsArr(this.state.group, pageNumber);
      }
    }
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
    this.state.score = 0;
    this.state.currentWordIndex = -1;
    this.state.isGameFinished = false;
    this.state.correctAnswerCount = 0;
  }

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
    if (this.state.currentWordIndex === this.gameWords.length - 1) {
      this.state.isGameFinished = true;
    }

    this.state.currentWordEn = this.gameWords[this.state.currentWordIndex].word;
    this.state.currentWordRuTrue = this.gameWords[this.state.currentWordIndex].wordTranslate;
    this.state.currentWordRu = this.getWordTranslate();
    updateView(this.state);
  }

  getWordTranslate() {
    if (Math.floor(Math.random() * 2)) return this.gameWords[this.state.currentWordIndex].wordTranslate;
    else {
      const index = Math.floor(Math.random() * this.gameWords.length);
      return this.gameWords[index].wordTranslate;
    }
  }

  checkAnswer(answer: boolean) {
    const condition1 = answer && this.gameWords[this.state.currentWordIndex].wordTranslate === this.state.currentWordRu;
    const condition2 =
      !answer && this.gameWords[this.state.currentWordIndex].wordTranslate !== this.state.currentWordRu;
    if (condition1 || condition2) this.doAnswerCorrect();
    else this.doAnswerIncorrect();
  }

  doAnswerCorrect() {
    //     if (this.authorization.isAuth) {
    // DataAPI.createUserWord(this.authorization.token, this.authorization.userId, this.gameWords[this.state.currentWordIndex].id,)
    //     }
    console.log(this.gameWords[this.state.currentWordIndex]);

    this.state.score += 10 * this.state.speedSprint;
    if (this.state.correctAnswerCount === 3) {
      this.state.speedSprint = this.state.speedSprint < 8 ? this.state.speedSprint * 2 : 8;
      this.state.speedIconCount++;
      this.state.correctAnswerCount = 0;
    } else this.state.correctAnswerCount++;
  }

  doAnswerIncorrect() {
    this.state.correctAnswerCount = 0;
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
  }
}
