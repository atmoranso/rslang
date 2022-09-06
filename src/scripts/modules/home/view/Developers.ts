import ElementTemplate from '../../../common/ElementTemplate';
import { developersData } from './homeViewData';

export default class Developers extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section team');
    const sectionContainer = new ElementTemplate(this.node, 'div', 'section__container');
    new ElementTemplate(sectionContainer.node, 'h2', 'team__subtitle subtitle', 'Наша команда');
    const developersContainer = new ElementTemplate(sectionContainer.node, 'ul', 'team__list developers');

    developersData.forEach((person) => {
      const listItem = new ElementTemplate(developersContainer.node, 'li', 'developers__item developer');

      const imageContainer = new ElementTemplate(listItem.node, 'div', 'developer__image-container');
      const img = new ElementTemplate<HTMLImageElement>(imageContainer.node, 'img', 'developer__img');
      img.node.src = person.img;

      const nameContainer = new ElementTemplate(imageContainer.node, 'div', 'developer__name-container');
      new ElementTemplate(nameContainer.node, 'h3', 'developer__subtitle', person.title);
      new ElementTemplate(nameContainer.node, 'p', 'developer__content', person.subtitle);

      const descriptionContainer = new ElementTemplate(listItem.node, 'div', 'developer__description-container');
      new ElementTemplate(descriptionContainer.node, 'p', 'developer__content', person.about);
      const githubLink = new ElementTemplate<HTMLAnchorElement>(
        descriptionContainer.node,
        'a',
        'developer__content',
        person.githubName,
      );
      githubLink.node.href = person.githubLink;
    });
  }
}
