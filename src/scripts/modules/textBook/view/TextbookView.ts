import ElementTemplate from '../../../common/ElementTemplate';
import Navigator from './NavigatorView';
import Card from './CardView';
import DataAPI from '../../../common/api/DataAPI';
import Word from '../../../common/api/models/Word.model';

export default class TextbookView extends ElementTemplate {
  private navigator: Navigator;

  private cards: ElementTemplate;

  private currentSpeaker: Card | null = null;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'section', 'textbook');
    this.cards = new ElementTemplate(this.node, 'div', 'cards');
    this.navigator = new Navigator(this.node, this.renderCards);
  }

  private renderCards = async (state: { group: number; page: number }) => {
    try {
      const res = await DataAPI.getChunkOfWords(state.group - 1, state.page - 1);
      this.cards.delete();
      this.cards = new ElementTemplate(this.node, 'div', 'cards');
      res.forEach((el: Word) => {
        new Card(this.cards.node, el, DataAPI.baseURL, (newSpeaker: Card) => {
          if (this.currentSpeaker) {
            this.currentSpeaker.pauseSpeech();
          }
          this.currentSpeaker = newSpeaker;
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.name}: ${error.message}`);
      }
    }
  };
}
