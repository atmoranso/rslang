import ElementTemplate from '../../common/ElementTemplate';
import FooterView from '../../common/FooterView';
import HeaderView from '../../common/HeaderView';

export default class AppView {
  node = document.body;

  header: HeaderView;

  main: ElementTemplate;

  module: ElementTemplate;

  footer: FooterView;

  constructor() {
    this.header = new HeaderView(this.node);
    this.main = new ElementTemplate(this.node, 'main', 'main');
    this.module = new ElementTemplate(this.main.node, 'div');
    this.footer = new FooterView(this.node);
  }

  update(module: ElementTemplate) {
    this.module.delete();
    this.module = module;
    this.main.node.append(module.node);
  }
}
