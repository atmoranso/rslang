import AppModel from '../model/AppModel';
import Router from '../router/Router';
import AppView from '../view/AppView';
import state from '../../common/state';

export default class AppController {
  view: AppView;

  router: Router;

  model: AppModel;

  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;
    this.router = new Router(view, state);
  }

  start() {
    this.router.init();
    this.view.header.burger.node.addEventListener('click', this.clickBurgerButtonHandler);
    this.view.header.navMenu.node.addEventListener('click', this.clickMenuHandler);
    this.view.header.overlay.node.addEventListener('click', this.clickBurgerButtonHandler);
  }

  clickBurgerButtonHandler = () => {
    const burger = this.view.header.burger.node;
    const menu = this.view.header.navMenu.node;
    const overlay = this.view.header.overlay.node;
    this.model.toggleOpenLockClasses(burger, menu, overlay);
  };

  clickMenuHandler = () => {
    const burger = this.view.header.burger.node;
    const menu = this.view.header.navMenu.node;
    const overlay = this.view.header.overlay.node;
    this.model.removeLockClass(burger, menu, overlay);
  };
}
