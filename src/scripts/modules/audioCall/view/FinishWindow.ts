import ElementTemplate from '../../../common/ElementTemplate';
import { AudioCallState } from '../../../common/stateTypes';

export default class FinishWindow extends ElementTemplate {
  btnPlayAgain: ElementTemplate<HTMLButtonElement>;

  correctBlock: ElementTemplate;

  inCorrectBlock: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint__finish-window finish');
    this.correctBlock = new ElementTemplate(this.node, 'div', 'finish__correct-block');

    this.inCorrectBlock = new ElementTemplate(this.node, 'div', 'finish__incorrect-block');

    this.btnPlayAgain = new ElementTemplate<HTMLButtonElement>(
      this.node,
      'button',
      'btn finish__btn-play',
      'Новая игра',
    );
  }

  update = (state: AudioCallState) => {
    this.correctBlock.delete();
    this.inCorrectBlock.delete();
    const correctWordsArr = state.gameWords.filter((word) => state.wordsCorrectIds.includes(word.id));
    const inCorrectWordsArr = state.gameWords.filter((word) => state.wordsInCorrectIds.includes(word.id));
    this.correctBlock = new ElementTemplate(this.node, 'div', 'finish__correct-block');
    new ElementTemplate(this.correctBlock.node, 'h3', 'finish__correct-block-title', '<b>Угаданные:</b>');
    correctWordsArr.forEach((word) => {
      new ElementTemplate(
        this.correctBlock.node,
        'div',
        'finish__correct-block-item',
        `<b>${word.word}</b> - ${word.wordTranslate}`,
      );
    });
    this.inCorrectBlock = new ElementTemplate(this.node, 'div', 'finish__incorrect-block');
    new ElementTemplate(this.inCorrectBlock.node, 'h3', 'finish__incorrect-block-title', '<b>Неугаданные:</b>');

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
