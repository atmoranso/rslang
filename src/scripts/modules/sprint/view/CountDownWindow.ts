import ElementTemplate from '../../../common/ElementTemplate';

export default class CountDownWindow extends ElementTemplate {
  count: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint__countdown-window countdown');
    this.count = new ElementTemplate(this.node, 'div', 'countdown__count', '5');
  }

  update = (digit: number) => {
    this.count.node.innerText = '' + digit;
  };
}
