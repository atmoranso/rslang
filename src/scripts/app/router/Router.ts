import { Module } from '../../common/types';
import ErrorPage from '../../modules/errorPage/ErrorPage';
import Home from '../../modules/home/Home';
import Textbook from '../../modules/textBook/TextBook';
import AppView from '../view/AppView';
import { AppState } from '../../common/stateTypes';
import Authorization from '../../modules/authorization/Authorization';

export default class Router {
  view: AppView;

  state: AppState;

  private routes: Record<string, new (state: AppState) => Module> = {
    '404': ErrorPage,
    '': Home,
    textbook: Textbook,
  };

  constructor(view: AppView, state: AppState) {
    this.view = view;
    this.state = state;
  }

  router = () => {
    const path = window.location.hash.slice(1);
    const route = this.routes[path] ? this.routes[path] : this.routes['404'];
    const module = new route(this.state);
    module.start();
    this.view.update(module.view);
  };

  init() {
    const authorization = new Authorization(this.state);
    this.view.header.node.append(authorization.view.node);
    authorization.controller.start();

    window.addEventListener('hashchange', this.router);
    this.router();
  }
}
