import ElementTemplate from '../../../common/ElementTemplate';

export default class Developer extends ElementTemplate {
  constructor(
    parentNode: HTMLElement,
    person: { title: string; img: string; subtitle: string; about: string; githubName: string; githubLink: string },
  ) {
    super(parentNode, 'li', 'list__item item');
    new ElementTemplate(this.node, 'h3', 'item__subtitle', person.title);
    const img = new ElementTemplate<HTMLImageElement>(this.node, 'img', 'item__img');
    img.node.src = person.img;
    new ElementTemplate(this.node, 'p', 'item__content', person.subtitle);
    new ElementTemplate(this.node, 'p', 'item__content', person.about);
    const githubLink = new ElementTemplate<HTMLAnchorElement>(this.node, 'a', 'item__content', person.githubName);
    githubLink.node.href = person.githubLink;
  }
}
