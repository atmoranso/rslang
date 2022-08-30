import ElementTemplate from '../../../common/ElementTemplate';
import { SprintState } from '../../../common/stateTypes';

export default class Board extends ElementTemplate {
  bullets: ElementTemplate[] = [];

  bulletText: ElementTemplate;

  speedIcon: ElementTemplate[] = [];

  wordEn: ElementTemplate;

  wordRu: ElementTemplate;

  btnFalse: ElementTemplate<HTMLButtonElement>;

  btnTrue: ElementTemplate<HTMLButtonElement>;

  speedColors: Record<string, string> = {
    1: 'white',
    2: '#ffefbb',
    4: '#ffa731',
    8: '#ed7070',
  };

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'board');
    const ratioContainer = new ElementTemplate(this.node, 'div', 'board__bullet-container');
    for (let i = 0; i < 3; i++) {
      this.bullets.push(new ElementTemplate(ratioContainer.node, 'div', 'board__bullet'));
    }
    this.bulletText = new ElementTemplate(this.node, 'p', 'board__bullet-desc', '+10 очков за слово');
    const speedContainer = new ElementTemplate(this.node, 'div', 'board__speed-container');

    for (let i = 0; i < 4; i++) {
      this.speedIcon.push(new ElementTemplate(speedContainer.node, 'div', 'board__speed'));
    }

    this.wordEn = new ElementTemplate(this.node, 'p', 'board__word-en', '');
    this.wordRu = new ElementTemplate(this.node, 'p', 'board__word-ru', '');

    const buttonContainer = new ElementTemplate(this.node, 'div', 'board__button-container');

    this.btnFalse = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'btn board__btn board__btn_false',
      'Неверно',
    );
    this.btnTrue = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'btn board__btn board__btn_true',
      'Верно',
    );
  }

  update = (state: SprintState) => {
    this.wordEn.node.innerHTML = state.currentWordEn;
    this.wordRu.node.innerHTML = state.currentWordRu;
    this.updateBullets(state.correctAnswerCount);
    this.updateSpeedIcon(state.speedIconCount);
    this.updateBulletText(state.speedSprint);
  };

  updateBullets = (correctAnswerCount: number) => {
    this.bullets.forEach((item, index) => {
      if (index < correctAnswerCount) item.node.classList.add('active');
      else item.node.classList.remove('active');
    });
  };

  updateSpeedIcon = (speedIconCount: number) => {
    this.speedIcon.forEach((item, index) => {
      if (index < speedIconCount) item.node.classList.add('active');
      else item.node.classList.remove('active');
    });
  };

  updateBulletText = (speedSprint: number) => {
    this.bulletText.node.style.backgroundColor = this.speedColors[speedSprint];
    this.bulletText.node.innerText = `+${10 * speedSprint} очков за слово`;
  };
}
