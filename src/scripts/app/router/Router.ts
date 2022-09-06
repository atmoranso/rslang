import { Module } from '../../common/types';
import AudioCall from '../../modules/audioCall/AudioCall';
import ErrorPage from '../../modules/errorPage/ErrorPage';
import Home from '../../modules/home/Home';
import Sprint from '../../modules/sprint/Sprint';
import Statistic from '../../modules/statistic/Statistic';
import Textbook from '../../modules/textBook/TextBook';
import AppView from '../view/AppView';
import { AppState } from '../../common/stateTypes';
import AuthorizationModule from '../../modules/authorization/Authorization';

export default class Router {
  view: AppView;

  authorization: AuthorizationModule;

  state: AppState;

  previousPage: Module;

  private routes: Record<string, new (state: AppState) => Module> = {
    '404': ErrorPage,
    '': Home,
    textbook: Textbook,
    sprint: Sprint,
    audiocall: AudioCall,
    'sprint?textbook': Sprint,
    'audiocall?textbook': AudioCall,
    statistics: Statistic,
  };

  constructor(view: AppView, state: AppState) {
    this.view = view;
    this.state = state;
    this.authorization = new AuthorizationModule(state);
    this.previousPage = this.authorization;
  }

  router = () => {
    if (this.previousPage instanceof AudioCall) {
      window.removeEventListener('keyup', this.previousPage.controller.clickDontKnowHandler);
      window.removeEventListener('keyup', this.previousPage.controller.clickNextHandler);
      window.removeEventListener('keyup', this.previousPage.controller.clickKeyHandler);
      window.removeEventListener('keyup', this.previousPage.controller.clickPlayAgainHandler);
    }
    if (this.previousPage instanceof Sprint) {
      window.removeEventListener('keyup', this.previousPage.controller.clickFalseHandler);
      window.removeEventListener('keyup', this.previousPage.controller.clickTrueHandler);
      window.removeEventListener('keyup', this.previousPage.controller.clickPlayAgainHandler);
    }

    this.checkLocalStorage();
    const path = window.location.hash.slice(1);

    if (!path.match(/sprint|audiocall/i)) {
      this.view.node.append(this.view.footer.node);
    } else {
      this.view.footer.delete();
    }
    const route = this.routes[path] ? this.routes[path] : this.routes['404'];
    const module = new route(this.state);
    this.state.sprint.isFromTextBook = path.match(/\?textbook/i) ? true : false;
    this.state.audioCall.isFromTextBook = path.match(/\?textbook/i) ? true : false;
    module.start();
    this.view.update(module.view);
    this.previousPage = module;
  };

  init = () => {
    window.addEventListener('hashchange', this.router);
    this.checkLocalStorage();
    this.startAuthorizationModule();
    this.router();
  };

  checkLocalStorage = () => {
    const savedState: AppState | '' = localStorage.getItem('rsLang-appState-DT')
      ? JSON.parse(<string>localStorage.getItem('rsLang-appState-DT'))
      : '';
    if (savedState !== '') this.state.authorization = savedState.authorization;
    if (!this.state.authorization.token) {
      this.state.authorization.isAuth = false;
    } else {
    }

    if (savedState !== '') this.state.textbook = savedState.textbook;
  };

  startAuthorizationModule = () => {
    this.authorization.controller.start(this.view.header);
  };
}
