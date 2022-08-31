import { Module } from '../../common/types';
import ErrorPage from '../../modules/errorPage/ErrorPage';
import Home from '../../modules/home/Home';
import Textbook from '../../modules/textBook/TextBook';
import AppView from '../view/AppView';
import state from '../../common/state';
import { AppState } from '../../common/stateTypes';

export default class Router {
  view: AppView;

  private routes: Record<string, new (state: AppState) => Module> = {
    '404': ErrorPage,
    '': Home,
    textbook: Textbook,
  };

  constructor(view: AppView) {
    this.view = view;
  }

  router = () => {
    const path = window.location.hash.slice(1);
    const route = this.routes[path] ? this.routes[path] : this.routes['404'];
    const module = new route(state);
    module.start();
    this.view.update(module.view);
  };

  init() {
    window.addEventListener('hashchange', this.router);
    this.router();
  }
}
