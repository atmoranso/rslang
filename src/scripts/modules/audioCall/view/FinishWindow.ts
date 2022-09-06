import ElementTemplate from '../../../common/ElementTemplate';
import { AudioCallState } from '../../../common/stateTypes';
import playSvg from './play.svg';
import stopSvg from './stop.svg';

export default class FinishWindow extends ElementTemplate {
  btnPlayAgain: ElementTemplate<HTMLButtonElement>;

  isPLaying = false;

  audioEl: ElementTemplate[] = [];

  audioSrc: HTMLAudioElement[] = [];

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
    this.audioEl = [];
    this.correctBlock.delete();
    this.inCorrectBlock.delete();
    const correctWordsArr = state.gameWords.filter((word) => state.wordsCorrectIds.includes(word.id));
    const inCorrectWordsArr = state.gameWords.filter((word) => state.wordsInCorrectIds.includes(word.id));
    this.correctBlock = new ElementTemplate(this.node, 'div', 'finish__correct-block');
    new ElementTemplate(
      this.correctBlock.node,
      'h3',
      'finish__correct-block-title',
      `<b>Угаданные: (${correctWordsArr.length})</b>`,
    );
    correctWordsArr.forEach((word) => {
      const wordLine = new ElementTemplate(this.correctBlock.node, 'div', 'finish__word-line');
      const audioImg = new ElementTemplate(wordLine.node, 'div', 'finish__word-audio-icon');
      audioImg.node.innerHTML = playSvg;
      this.audioEl.push(audioImg);
      this.audioSrc.push(new Audio(word.audio));
      new ElementTemplate(
        wordLine.node,
        'div',
        'finish__correct-block-item',
        `<b>${word.word}</b> - ${word.wordTranslate}`,
      );
    });
    this.inCorrectBlock = new ElementTemplate(this.node, 'div', 'finish__incorrect-block');
    new ElementTemplate(
      this.inCorrectBlock.node,
      'h3',
      'finish__incorrect-block-title',
      `<b>Неугаданные: (${inCorrectWordsArr.length})</b>`,
    );

    inCorrectWordsArr.forEach((word) => {
      const wordLine = new ElementTemplate(this.inCorrectBlock.node, 'div', 'finish__word-line');
      const audioImg = new ElementTemplate(wordLine.node, 'div', 'finish__word-audio-icon');
      audioImg.node.innerHTML = playSvg;
      this.audioEl.push(audioImg);
      this.audioSrc.push(new Audio(word.audio));
      new ElementTemplate(
        wordLine.node,
        'div',
        'finish__incorrect-block-item',
        `<b>${word.word}</b> - ${word.wordTranslate}`,
      );
    });
    this.node.append(this.btnPlayAgain.node);
    this.setAudioListeners();
  };

  setAudioListeners = () => {
    this.audioEl.forEach((item, i) => {
      item.node.addEventListener('click', () => {
        this.clickAudioHandler(i);
      });
    });
  };

  clickAudioHandler = (i: number) => {
    this.audioSrc.forEach((audio, index) => {
      audio.pause();
      this.changePlayIcon(true, index);
    });
    this.audioSrc[i].play();
    this.changePlayIcon(false, i);
    this.audioSrc[i].addEventListener('ended', () => {
      this.changePlayIcon(true, i);
    });
  };

  changePlayIcon = (isPlay: boolean, i: number) => {
    this.audioEl[i].node.innerHTML = isPlay ? playSvg : stopSvg;
  };
}
