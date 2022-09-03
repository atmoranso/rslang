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
  }
}
