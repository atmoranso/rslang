import ElementTemplate from '../../../common/ElementTemplate';

export default class ErrorPageView extends ElementTemplate {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'errorPage', 'Error 404, the page not found');
  }
}
