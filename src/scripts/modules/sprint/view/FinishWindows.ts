import ElementTemplate from '../../../common/ElementTemplate';

export default class FinishWindow extends ElementTemplate {
  btnPlayAgain: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint__finish-window finish');

    this.btnPlayAgain = new ElementTemplate<HTMLButtonElement>(this.node, 'button', 'finish__btn-play', 'Еще разок?');
  }
}
