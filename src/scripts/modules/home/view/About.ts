import ElementTemplate from '../../../common/ElementTemplate';
import { aboutData } from './homeViewData';

export default class About extends ElementTemplate {
  statLink: HTMLAnchorElement | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section about');
    const sectionContainer = new ElementTemplate(this.node, 'div', 'section__container');
    new ElementTemplate(
      sectionContainer.node,
      'h2',
      'about__subtitle subtitle',
      'Всего 4 шага для эффективного изучения',
    );
    const aboutContainer = new ElementTemplate(sectionContainer.node, 'div', 'about__list list');
    aboutData.forEach((item) => {
      const listItem = new ElementTemplate<HTMLAnchorElement>(aboutContainer.node, 'a', 'list__item item');
      if (item.number == '4') {
        this.statLink = listItem.node;
      }
      listItem.node.href = item.url;
      const itemContainer = new ElementTemplate(listItem.node, 'div', 'item__container');
      new ElementTemplate(itemContainer.node, 'span', 'item__number', item.number);
      new ElementTemplate(itemContainer.node, 'h3', 'item__subtitle', item.title);
      const image = new ElementTemplate<HTMLImageElement>(listItem.node, 'img', 'item__img');
      image.node.src = item.img;
      new ElementTemplate(listItem.node, 'p', 'item__content', item.about);
    });
  }
}
