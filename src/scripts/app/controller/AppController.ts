import AppModel from '../model/AppModel';
import Router from '../router/Router';
import AppView from '../view/AppView';
import state from '../../common/state';
import { Authorization, Textbook } from '../../common/stateTypes';
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
    const authorization: Authorization | '' = localStorage.getItem('rsLang-appState-DT')
      ? JSON.parse(<string>localStorage.getItem('rsLang-appState-DT')).authorization
      : '';
    const textbook: Textbook | '' = localStorage.getItem('rsLang-appState-DT')
      ? JSON.parse(<string>localStorage.getItem('rsLang-appState-DT')).textbook
      : '';
    if (authorization !== '') state.authorization = authorization;
    if (textbook !== '') state.textbook = textbook;
  };

  startAuthorizationModule = () => {
    this.authorization.controller.start(this.view.header);
  };
}
