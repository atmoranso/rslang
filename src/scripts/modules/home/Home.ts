import View from './view/view';

export class Home {
  private view: View;

  constructor() {
    this.view = new View(document.body);
    this.view.renderHomePage();
  }
}
