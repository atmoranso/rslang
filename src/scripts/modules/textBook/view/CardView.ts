import ElementTemplate from '../../../common/ElementTemplate';
import Word from '../../../common/api/models/Word.model';

export default class CardView extends ElementTemplate {
  private audio: HTMLAudioElement;

  private audioMeaning: HTMLAudioElement;

  private audioExample: HTMLAudioElement;

  constructor(parentNode: HTMLElement, data: Word, baseURL: string, setNewSpeaker: (newSpeaker: CardView) => void) {
    super(parentNode, 'div', 'card');
    this.audio = new Audio(`${baseURL}${data.audio}`);
    this.audioMeaning = new Audio(`${baseURL}${data.audioMeaning}`);
    this.audioExample = new Audio(`${baseURL}${data.audioExample}`);
    new ElementTemplate(this.node, 'span', 'card__word', data.word);
    new ElementTemplate(this.node, 'span', 'card__transcription', data.transcription);
    new ElementTemplate(this.node, 'span', 'card__word-translate', data.wordTranslate);
    new ElementTemplate(this.node, 'p', 'card__text-meaning', data.textMeaning);
    new ElementTemplate(this.node, 'p', 'card__text-meaning-translate', data.textMeaningTranslate);
    new ElementTemplate(this.node, 'p', 'card__text-example', data.textExample);
    new ElementTemplate(this.node, 'p', 'card__text-example-translate', data.textExampleTranslate);
    const image = new ElementTemplate(this.node, 'div', 'card__image');
    image.node.style.backgroundImage = `url(${baseURL}${data.image})`;
    const listenButton = new ElementTemplate(this.node, 'button', 'card__listen-button');
    const difficultButton = new ElementTemplate(this.node, 'button', 'card__difficult-button');
    const learnedButton = new ElementTemplate(this.node, 'button', 'card__learned-button');
    listenButton.node.addEventListener('click', () => {
      setNewSpeaker(this);
      this.loadSpeech();
      this.playSpeech();
    });
  }

  private loadSpeech() {
    this.audio.load();
    this.audioMeaning.load();
    this.audioExample.load();
  }

  private playSpeech() {
    this.audio.play();
    this.audio.addEventListener('ended', () => {
      this.audioMeaning.play();
      this.audioMeaning.addEventListener('ended', () => {
        this.audioExample.play();
        this.audioExample.addEventListener('ended', () => {
          this.audioExample.pause();
        });
      });
    });
  }

  pauseSpeech() {
    this.audio.pause();
    this.audioMeaning.pause();
    this.audioExample.pause();
  }
}
