import ElementTemplate from '../../../common/ElementTemplate';

export default class WaitingWindow extends ElementTemplate {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'waiting-window hidden');
    new ElementTemplate(this.node, 'div', 'waiting-window__overlay');
    new ElementTemplate(this.node, 'div', 'waiting-window__box', 'Waiting for load...');
  }
}
