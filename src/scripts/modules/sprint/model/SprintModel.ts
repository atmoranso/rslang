import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';
import { SprintState } from '../../../common/stateTypes';

export default class SprintModel {
  state: SprintState;

  gameWords: Word[] = [];

  constructor(state: SprintState) {
    this.state = state;
  }

  async prepareData(updateView: () => void) {
    if (this.gameWords.length > 1) {
    } else {
      updateView();
      const response = await DataAPI.getChunkOfWords(this.state.group, 0);
      if ('status' in response) {
        throw new Error(response.status + '  ' + response.statusText);
      }

      this.gameWords = response;
    }
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
    this.state.score = 0;
    this.state.currentWordIndex = -1;
    this.state.isGameFinished = false;
    this.state.correctAnswerCount = 0;
  }

  setLevel = (level: number) => {
    this.state.group = level;
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
    if (condition1 || condition2) this.ifAnswerCorrect();
    else this.ifAnswerIncorrect();
  }

  ifAnswerCorrect() {
    this.state.score += 10 * this.state.speedSprint;
    if (this.state.correctAnswerCount === 3) {
      this.state.speedSprint = this.state.speedSprint < 8 ? this.state.speedSprint * 2 : 8;
      this.state.speedIconCount++;
      this.state.correctAnswerCount = 0;
    } else this.state.correctAnswerCount++;
  }

  ifAnswerIncorrect() {
    this.state.correctAnswerCount = 0;
    this.state.speedSprint = 1;
    this.state.speedIconCount = 1;
  }
}
