import AppModel from '../model/AppModel';
import Router from '../router/Router';
import AppView from '../view/AppView';

export default class AppController {
  view: AppView;

  router: Router;

  model: AppModel;

  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;
    this.router = new Router(view);
  }

  start() {
    this.router.init();
  }
}
