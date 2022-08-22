import { Module } from '../../common/types';
import ErrorPage from '../../modules/errorPage/ErrorPage';
import Home from '../../modules/home/Home';
import AppView from '../view/AppView';

export default class Router {
  view: AppView;

  private routes: Record<string, new () => Module> = {
    '404': ErrorPage,
    '': Home,
  };

  constructor(view: AppView) {
    this.view = view;
  }

  router = () => {
    const path = window.location.hash.slice(1);
    const route = this.routes[path] ? this.routes[path] : this.routes['404'];
    new route().start();
  };

  init() {
    window.addEventListener('hashchange', this.router);
    this.router();
  }
}
