import ElementTemplate from '../../../common/ElementTemplate';

export default class Greetings extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section greet');
    const sectionContainer = new ElementTemplate(this.node, 'div', 'section__container');
    const greetTextContainer = new ElementTemplate(sectionContainer.node, 'div', 'greet__text-container');
    new ElementTemplate(greetTextContainer.node, 'span', 'greet__text-content', 'RSLang');
    new ElementTemplate(
      greetTextContainer.node,
      'span',
      'greet__text-content',
      ' – простой и интересный способ выучить английский язык.',
    );
    new ElementTemplate(
      greetTextContainer.node,
      'p',
      'greet__text-content',
      'Более 3000 слов с изображениями, фонетической транскрипцией и произношением, записанным носителями языка.',
    );
    new ElementTemplate(
      greetTextContainer.node,
      'p',
      'greet__text-content',
      'Обучение в игре, статистика тренировок - здесь ты найдешь много интересного!',
    );
  }
}
