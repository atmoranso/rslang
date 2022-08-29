import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';

export default class SprintModel {
  score = 0;

  factor = 1;

  gameWords: Word[] = [];

  currentWordIndex = -1;

  currentWordTranslate = '';

  isGameFinished = false;

  async prepareData(level: number) {
    if (this.gameWords.length > 1) {
    } else {
      const response: Word[] = await DataAPI.getChunkOfWords(level, 0);
      this.gameWords = response;
    }
    this.factor = 1;
    this.score = 0;
    this.currentWordIndex = -1;
    this.isGameFinished = false;
  }

  setNextWord(updateView: (wordEn: string, wordRu: string) => void) {
    this.currentWordIndex++;
    if (this.currentWordIndex === this.gameWords.length - 1) {
      this.isGameFinished = true;
    }
    console.log(this.currentWordIndex);

    const index = this.currentWordIndex;
    this.currentWordTranslate = this.getWordTranslate();
    updateView(this.gameWords[index].word, this.currentWordTranslate);
  }

  getWordTranslate() {
    if (Math.floor(Math.random() * 2)) return this.gameWords[this.currentWordIndex].wordTranslate;
    else {
      const index = Math.floor(Math.random() * this.gameWords.length);
      return this.gameWords[index].wordTranslate;
    }
  }

  checkAnswer(answer: boolean, updateView: (score: string) => void) {
    if (answer && this.gameWords[this.currentWordIndex].wordTranslate === this.currentWordTranslate) {
      this.score += 10 * this.factor;
    } else if (!answer && this.gameWords[this.currentWordIndex].wordTranslate !== this.currentWordTranslate) {
      this.score += 10 * this.factor;
      console.log(this.score);
    }
    updateView('' + this.score);
  }
}
