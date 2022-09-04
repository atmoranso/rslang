import ElementTemplate from '../../../common/ElementTemplate';

export default class LevelSelect extends ElementTemplate {
  level: ElementTemplate[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'audiocall__start-window start');
    new ElementTemplate(this.node, 'div', 'start__title', 'Выберите сложность:');
    const levelContainer = new ElementTemplate(this.node, 'div', 'start__level-container');
    for (let i = 0; i < 6; i++) {
      this.level.push(new ElementTemplate(levelContainer.node, 'button', 'start__level-btn btn', `${i + 1}`));
    }
  }
}
