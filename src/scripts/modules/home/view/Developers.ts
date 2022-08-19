import ElementTemplate from '../../../common/ElementTemplate';
import { developersData } from './homeViewData';

export default class Developers extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section developers');
    const sectionContainer = new ElementTemplate(this.node, 'div', 'section__container');
    this.node.append(sectionContainer.node);
    new ElementTemplate(sectionContainer.node, 'h2', 'developers__subtitle subtitle', 'Наша команда');
    const developersContainer = new ElementTemplate(sectionContainer.node, 'ul', 'developers__list list');

    developersData.forEach((person) => {
      const listItem = new ElementTemplate(developersContainer.node, 'li', 'list__item item');
      new ElementTemplate(listItem.node, 'h3', 'item__subtitle', person.title);
      const img = new ElementTemplate<HTMLImageElement>(listItem.node, 'img', 'item__img');
      img.node.src = person.img;
      new ElementTemplate(listItem.node, 'p', 'item__content', person.subtitle);
      new ElementTemplate(listItem.node, 'p', 'item__content', person.about);
      const githubLink = new ElementTemplate<HTMLAnchorElement>(listItem.node, 'a', 'item__content', person.githubName);
      githubLink.node.href = person.githubLink;
    });
  }
}
