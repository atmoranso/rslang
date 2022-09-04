import ElementTemplate from '../../../common/ElementTemplate';
import { AudioCallState } from '../../../common/stateTypes';
import playSvg from './play.svg';
import stopSvg from './stop.svg';

export default class Board extends ElementTemplate {
  audio: ElementTemplate;

  audioSrc: HTMLAudioElement | undefined;

  wordImgContainer: ElementTemplate;

  wordImg: ElementTemplate<HTMLImageElement>;

  wordRuContainer: ElementTemplate;

  wordRu: ElementTemplate<HTMLButtonElement>[] = [];

  wordEn: ElementTemplate;

  btnDontKnow: ElementTemplate<HTMLButtonElement>;

  btnNext: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'audio-board');

    this.audio = new ElementTemplate(this.node, 'div', 'audio-board__audio', '');
    this.audio.node.innerHTML = playSvg;
    this.wordImgContainer = new ElementTemplate(null, 'div', 'audio-board__img-container', '');
    this.wordEn = new ElementTemplate(null, 'div', 'audio-board__word-en', '');
    this.wordImg = new ElementTemplate<HTMLImageElement>(this.wordImgContainer.node, 'img', 'audio-board__img', '');
    this.wordRuContainer = new ElementTemplate(this.node, 'div', 'audio-board__words-container', '');

    for (let i = 0; i < 5; i++) {
      const word = new ElementTemplate<HTMLButtonElement>(
        this.wordRuContainer.node,
        'button',
        'audio-board__word-ru btn',
        '',
      );
      this.wordRu.push(word);
    }

    this.btnDontKnow = new ElementTemplate<HTMLButtonElement>(
      this.node,
      'button',
      'btn board__btn audio-board__btn_dont-know',
      'Не знаю',
    );

    this.btnNext = new ElementTemplate<HTMLButtonElement>(
      null,
      'button',
      'btn board__btn audio-board__btn_next',
      'Далее...',
    );
  }

  update = (state: AudioCallState) => {
    this.audioSrc = new Audio(state.gameWords[state.currentWordIndex].audio);
    this.wordImgContainer.delete();
    this.wordEn.delete();
    this.wordRu.forEach((wordElement, i) => {
      wordElement.node.classList.remove('correct', 'incorrect');
      this.audio.node.classList.remove('answered');

      wordElement.node.innerHTML = i + '&nbsp;&nbsp;' + state.currentWordRu[i];
    });
  };

  showAnswer = (correctAnswerNum: number, pressed: number, state: AudioCallState) => {
    this.audio.node.classList.add('answered');
    this.wordEn.node.innerText = state.gameWords[state.currentWordIndex].word;
    this.audio.node.append(this.wordEn.node);
    console.log(state.gameWords[state.currentWordIndex].word);

    this.wordImg.node.src = state.gameWords[state.currentWordIndex].image;
    this.audio.node.before(this.wordImgContainer.node);
    this.wordRu[correctAnswerNum - 1].node.classList.remove('incorrect');
    this.wordRu[correctAnswerNum - 1].node.classList.add('correct');

    if (pressed !== correctAnswerNum && pressed) {
      this.wordRu[pressed - 1].node.classList.remove('correct');
      this.wordRu[pressed - 1].node.classList.add('incorrect');
    }
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

  showNextBtn = () => {
    this.btnDontKnow.delete();
    this.node.append(this.btnNext.node);
  };

  showDontKnowBtn = () => {
    this.btnNext.delete();
    this.node.append(this.btnDontKnow.node);
  };

  disableButtons = () => {
    this.wordRu.forEach((word) => (word.node.disabled = true));
  };

  enableButtons = () => {
    this.wordRu.forEach((word) => (word.node.disabled = false));
  };
}
