import ElementTemplate from '../../../common/ElementTemplate';

export default class Board extends ElementTemplate {
  bullets: ElementTemplate[] = [];

  bulletText: ElementTemplate;

  speedIcon: ElementTemplate[] = [];

  wordEn: ElementTemplate;

  wordRu: ElementTemplate;

  btnFalse: ElementTemplate<HTMLButtonElement>;

  btnTrue: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'board');
    const ratioContainer = new ElementTemplate(this.node, 'div', 'board__bullet-container');
    for (let i = 0; i < 3; i++) {
      this.bullets.push(new ElementTemplate(ratioContainer.node, 'div', 'board__bullet'));
    }
    this.bulletText = new ElementTemplate(this.node, 'p', 'board__bullet-desc', '+10 очков за слово');
    const speedContainer = new ElementTemplate(this.node, 'div', 'board__speed-container');

    for (let i = 0; i < 3; i++) {
      this.speedIcon.push(new ElementTemplate(speedContainer.node, 'div', 'board__speed'));
    }

    this.wordEn = new ElementTemplate(this.node, 'p', 'board__word-en', 'wood');
    this.wordRu = new ElementTemplate(this.node, 'p', 'board__word-ru', 'дерево');

    const buttonContainer = new ElementTemplate(this.node, 'div', 'board__button-container');

    this.btnFalse = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'board__btn board__btn_false',
      'Неверно',
    );
    this.btnTrue = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'board__btn board__btn_true',
      'Верно',
    );
  }
}
