import ElementTemplate from '../../../common/ElementTemplate';
import { SprintState } from '../../../common/stateTypes';
import playSvg from './play.svg';
import stopSvg from './stop.svg';

export default class Board extends ElementTemplate {
  bullets: ElementTemplate[] = [];

  bulletText: ElementTemplate;

  speedIcon: ElementTemplate[] = [];

  wordEn: ElementTemplate;

  wordEnContainer: ElementTemplate;

  audio: ElementTemplate;

  audioSrc: HTMLAudioElement | undefined;

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

    this.wordEnContainer = new ElementTemplate(this.node, 'div', 'board__word-en-container', '');
    this.audio = new ElementTemplate(this.wordEnContainer.node, 'div', 'board__audio', '');
    this.audio.node.innerHTML = playSvg;
    this.wordEn = new ElementTemplate(this.wordEnContainer.node, 'div', 'board__word-en', '');
    this.wordRu = new ElementTemplate(this.node, 'div', 'board__word-ru', '');

    const buttonContainer = new ElementTemplate(this.node, 'div', 'board__button-container');

    this.btnFalse = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'btn board__btn board__btn_false',
      'Неверно<br>←',
    );
    this.btnTrue = new ElementTemplate<HTMLButtonElement>(
      buttonContainer.node,
      'button',
      'btn board__btn board__btn_true',
      'Верно<br>→',
    );
  }

  update = (state: SprintState) => {
    this.audioSrc = new Audio(state.gameWords[state.currentWordIndex].audio);
    this.wordEn.node.innerHTML = state.gameWords[state.currentWordIndex].word;
    this.wordEn.node.append(this.audioSrc);
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

  playPauseWord = (play: boolean) => {
    if (play) {
      this.changePlayIcon(false);

      this.audioSrc?.play();
    } else {
      this.changePlayIcon(true);

      this.audioSrc?.pause();
      if (this.audioSrc) this.audioSrc.currentTime = 0;
    }
  };

  changePlayIcon = (isPlay: boolean) => {
    this.audio.node.innerHTML = isPlay ? playSvg : stopSvg;
  };
}
