import ElementTemplate from '../../../common/ElementTemplate';
import Word from '../../../common/api/models/Word.model';

export default class CardView extends ElementTemplate {
  private audio: HTMLAudioElement | null = null;

  private audioMeaning: HTMLAudioElement | null = null;

  private audioExample: HTMLAudioElement | null = null;

  private auioSrcs: Record<string, string>;

  private isAudioInit = false;

  constructor(
    parentNode: HTMLElement,
    data: Word,
    baseURL: string,
    isAuth: boolean,
    setNewSpeaker: (newSpeaker: CardView) => void,
  ) {
    super(parentNode, 'div', 'card');
    this.auioSrcs = {
      audio: `${baseURL}${data.audio}`,
      audioMeaning: `${baseURL}${data.audioMeaning}`,
      audioExample: `${baseURL}${data.audioExample}`,
    };
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
    const difficultButtonAction = new ElementTemplate(difficultButton.node, 'div', 'card__difficult-button-plus');
    const learnedButton = new ElementTemplate(this.node, 'button', 'card__learned-button');
    const learnedButtonAction = new ElementTemplate(learnedButton.node, 'div', 'card__learned-button-plus');
    listenButton.node.addEventListener('click', () => {
      setNewSpeaker(this);
      if (!this.isAudioInit) {
        this.isAudioInit = true;
        this.initSpeech();
      }
      this.loadSpeech();
      this.playSpeech();
    });
  }

  private initSpeech() {
    this.audio = new Audio(this.auioSrcs.audio);
    this.audioMeaning = new Audio(this.auioSrcs.audioMeaning);
    this.audioExample = new Audio(this.auioSrcs.audioExample);
  }

  private loadSpeech() {
    this.audio?.load();
    this.audioMeaning?.load();
    this.audioExample?.load();
  }

  private playSpeech() {
    this.audio?.play();
    this.audio?.addEventListener('ended', () => {
      this.audioMeaning?.play();
      this.audioMeaning?.addEventListener('ended', () => {
        this.audioExample?.play();
        this.audioExample?.addEventListener('ended', () => {
          this.audioExample?.pause();
        });
      });
    });
  }

  pauseSpeech() {
    this.audio?.pause();
    this.audioMeaning?.pause();
    this.audioExample?.pause();
  }
}
