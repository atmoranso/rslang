import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';

export default class SprintModel {
  gameWords: Word[] = [];

  currentWordIndex = 0;

  isGameFinished = false;

  async prepareData(level: number) {
    if (this.gameWords.length > 1) {
    } else {
      const response: Word[] = await DataAPI.getChunkOfWords(level, 0);
      this.gameWords = response;
    }
    this.currentWordIndex = 0;
    this.isGameFinished = false;
  }

  setNextWord(updateView: (wordEn: string, wordRu: string) => void) {
    this.currentWordIndex++;
    if (this.currentWordIndex === this.gameWords.length - 1) {
      this.isGameFinished = true;
    }
    const index = this.currentWordIndex;
    console.dir(this.gameWords);

    updateView(this.gameWords[index].word, this.gameWords[index].wordTranslate);
  }
}
