import ElementTemplate from '../../../common/ElementTemplate';
import Navigator from './NavigatorView';
import Card from './CardView';
import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';
import UserWordExt from '../../../common/api/models/UserWordExt.model';
import YesNo from '../../../common/enums';
import { AppState } from '../../../common/stateTypes';

export default class TextbookView extends ElementTemplate {
  private navigator: Navigator;

  private cardsContainer: ElementTemplate;

  private cards: Array<Card> = [];

  private currentSpeaker: Card | null = null;

  private groupsMaxCount = 7;

  private state: AppState;

  constructor(parentNode: HTMLElement | null, state: AppState) {
    super(parentNode, 'section', 'textbook');
    this.state = state;
    this.navigator = new Navigator(this.node, this.groupsMaxCount, this.state, this.renderCards);
    this.cardsContainer = new ElementTemplate(this.node, 'div', 'cards');
  }

  private renderCards = async () => {
    try {
      const words = await this.getWords();
      let userWords: Array<UserWordExt> = [];
      if (this.state.authorization.isAuth) {
        userWords = await DataAPI.getUserWords(this.state.authorization.token, this.state.authorization.userId);
      }
      this.removePreviousCards();
      words.forEach((word: Word) => {
        const foundedWord = userWords.find((userWord: UserWordExt) => {
          return userWord.wordId === word.id;
        });
        const isRemoveAble = this.state.textbook.group === this.groupsMaxCount;
        const card = new Card(
          this.cardsContainer.node,
          word,
          DataAPI.baseURL,
          isRemoveAble,
          foundedWord,
          this.state,
          this.setNewSpeaker,
          this.onChangeUserWord,
        );
        this.cards.push(card);
      });
      this.onChangeUserWord();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.name}: ${error.message}`);
      }
    }
  };

  private onChangeUserWord = () => {
    if (this.state.textbook.group !== this.groupsMaxCount) {
      const visible = this.cards.every((card: Card) => card.isLearned || card.isDifficult);
      this.navigator.displayMedal(visible);
    }
  };

  private getWords = async () => {
    try {
      let res;
      if (this.state.textbook.group === this.groupsMaxCount) {
        const words: Array<Word> = [];
        const userWords = await DataAPI.getUserWords(this.state.authorization.token, this.state.authorization.userId);
        await Promise.all(
          userWords.map(async (el: { id: string; difficulty: string; wordId: string }) => {
            if (el.difficulty === YesNo.yes) {
              const word = await DataAPI.getWord(el.wordId);
              words.push(word);
            }
          }),
        );
        res = words;
      } else {
        res = await DataAPI.getChunkOfWords(this.state.textbook.group - 1, this.state.textbook.page - 1);
      }
      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.name}: ${error.message}`);
      }
    }
  };

  private removePreviousCards = () => {
    this.cards.forEach((el) => el.delete());
    this.cards = [];
  };

  private setNewSpeaker = (newSpeaker: Card) => {
    if (this.currentSpeaker && this.currentSpeaker !== newSpeaker) {
      this.currentSpeaker.pauseSpeech();
    }
    this.currentSpeaker = newSpeaker;
  };
}
