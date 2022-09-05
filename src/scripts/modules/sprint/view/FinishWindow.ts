import ElementTemplate from '../../../common/ElementTemplate';
import { SprintState } from '../../../common/stateTypes';

export default class FinishWindow extends ElementTemplate {
  btnPlayAgain: ElementTemplate<HTMLButtonElement>;

  correctBlock: ElementTemplate;

  hr: ElementTemplate;

  inCorrectBlock: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint__finish-window finish');
    this.correctBlock = new ElementTemplate(this.node, 'div', 'finish__correct-block');
    this.hr = new ElementTemplate(this.node, 'hr');

    this.inCorrectBlock = new ElementTemplate(this.node, 'div', 'finish__incorrect-block');

    this.btnPlayAgain = new ElementTemplate<HTMLButtonElement>(
      this.node,
      'button',
      'btn finish__btn-play',
      'Еще разок?',
    );
  }

  update = (state: SprintState) => {
    this.correctBlock.delete();
    this.inCorrectBlock.delete();
    this.hr.delete();
    const correctWordsArr = state.gameWords.filter((word) => state.wordsCorrectIds.includes(word.id));
    const inCorrectWordsArr = state.gameWords.filter((word) => state.wordsInCorrectIds.includes(word.id));
    this.correctBlock = new ElementTemplate(this.node, 'div', 'finish__correct-block');
    new ElementTemplate(this.correctBlock.node, 'h3', 'finish__correct-block-title', 'Угаданные:');
    correctWordsArr.forEach((word) => {
      new ElementTemplate(
        this.correctBlock.node,
        'div',
        'finish__correct-block-item',
        `<b>${word.word}</b> - ${word.wordTranslate}`,
      );
    });
    this.hr = new ElementTemplate(this.node, 'hr');
    this.inCorrectBlock = new ElementTemplate(this.node, 'div', 'finish__incorrect-block');
    new ElementTemplate(this.inCorrectBlock.node, 'h3', 'finish__incorrect-block-title', 'Неугаданные:');

    inCorrectWordsArr.forEach((word) => {
      new ElementTemplate(
        this.inCorrectBlock.node,
        'div',
        'finish__incorrect-block-item',
        `<b>${word.word}</b> - ${word.wordTranslate}`,
      );
    });
    this.node.append(this.btnPlayAgain.node);
  };
}
