import ElementTemplate from '../../../common/ElementTemplate';
import Word from '../../../common/api/models/Word.model';

export default class CardView extends ElementTemplate {
  constructor(parentNode: HTMLElement, data: Word, baseURL: string) {
    super(parentNode, 'div', 'card');
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
    listenButton.node.addEventListener('click', () => {
      const audio = new Audio(`${baseURL}${data.audio}`);
      audio.play();
      audio.addEventListener('ended', () => {
        const audioMeaning = new Audio(`${baseURL}${data.audioMeaning}`);
        audioMeaning.play();
        audioMeaning.addEventListener('ended', () => {
          const audioExample = new Audio(`${baseURL}${data.audioExample}`);
          audioExample.play();
          audioExample.addEventListener('ended', () => {
            audioExample.pause();
          });
        });
      });
    });
  }
}
