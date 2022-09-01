import AppModel from '../model/AppModel';
import Router from '../router/Router';
import AppView from '../view/AppView';
import state from '../../common/state';
import { AppState } from '../../common/stateTypes';
import AuthorizationModule from '../../modules/authorization/Authorization';

export default class AppController {
  view: AppView;

  router: Router;

  model: AppModel;

  authorization: AuthorizationModule;

  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;
    this.router = new Router(view, state);
    this.authorization = new AuthorizationModule(state);
  }

  start() {
    this.checkLocalStorage();
    this.startAuthorizationModule();
    this.router.init();
  }

  checkLocalStorage = () => {
    const savedState: AppState | '' = localStorage.getItem('rsLang-appState-DT')
      ? JSON.parse(<string>localStorage.getItem('rsLang-appState-DT'))
      : '';
    if (savedState !== '') state.authorization = savedState.authorization;
    if (savedState !== '') state.textbook = savedState.textbook;
  };

  startAuthorizationModule = () => {
    this.authorization.controller.start(this.view.header);
  };
}
