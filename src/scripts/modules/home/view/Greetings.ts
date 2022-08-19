import ElementTemplate from '../../../common/ElementTemplate';

export default class Greetings extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section greet');
    const sectionContainer = new ElementTemplate(this.node, 'div', 'section__container');
    this.node.append(sectionContainer.node);
    const greetTextContainer = new ElementTemplate(sectionContainer.node, 'div', 'greet__text-container');
    const image = new ElementTemplate<HTMLImageElement>(greetTextContainer.node, 'img', 'greet__img');
    image.node.src = 'https://via.placeholder.com/77x77/FFFF00';
    image.node.alt = '';
    new ElementTemplate(
      greetTextContainer.node,
      'p',
      'greet__text-content',
      'RS Lang – приложение для изучения иностранных слов,\n' +
        'включающее электронный учебник с базой слов для изучения, мини-игры для их повторения,\n   ' +
        'страницу статистики для отслеживания индивидуального прогресса. Здесь ты найдешь много интересного...',
    );
  }
}
