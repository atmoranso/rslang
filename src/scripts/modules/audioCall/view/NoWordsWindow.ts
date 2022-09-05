import ElementTemplate from '../../../common/ElementTemplate';

export default class NoWordsWindow extends ElementTemplate {
  btnPlayAgain: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint__finish-window finish');

    this.btnPlayAgain = new ElementTemplate<HTMLButtonElement>(
      this.node,
      'button',
      'btn finish__btn-play',
      'Новая игра',
    );
  }

  update = () => {
    this.node.append(this.btnPlayAgain.node);
  };
}
