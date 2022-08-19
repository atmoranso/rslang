import ElementTemplate from '../../../common/ElementTemplate';
import Developer from './Developer';
import { developers } from './developersData';

export default class Developers extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section developers');
    new ElementTemplate(this.node, 'h2', 'developers__subtitle subtitle', 'О команде');
    const developersContainer = new ElementTemplate(this.node, 'ul', 'developers__list list');
    developers.forEach((person) => new Developer(developersContainer.node, person));
  }
}
