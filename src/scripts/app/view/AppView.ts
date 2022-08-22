import ElementTemplate from '../../common/ElementTemplate';

export default class AppView {
  node = document.body;

  //   header: HeaderView;
  header = new ElementTemplate(this.node, 'header', 'header');

  main: ElementTemplate;

  //   footer: FooterView;

  constructor() {
    // this.header = new HeaderView(this.node);
    this.main = new ElementTemplate(this.node, 'main', 'main');
    // this.footer = new FooterView(this.node);
  }

  update(module: ElementTemplate) {
    this.main.delete();
    this.main = module;
    this.header.node.after(module.node);
  }
}
