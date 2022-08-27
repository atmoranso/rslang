import { Module } from '../../common/types';
import AudioCall from '../../modules/audioCall/AudioCall';
import ErrorPage from '../../modules/errorPage/ErrorPage';
import Home from '../../modules/home/Home';
import Sprint from '../../modules/sprint/Sprint';
import Statistic from '../../modules/statistic/Statistic';
import Textbook from '../../modules/textBook/TextBook';
import AppView from '../view/AppView';

export default class Router {
  view: AppView;

  private routes: Record<string, new () => Module> = {
    '404': ErrorPage,
    '': Home,
    textbook: Textbook,
    sprint: Sprint,
    audiocall: AudioCall,
    statistics: Statistic,
  };

  constructor(view: AppView) {
    this.view = view;
  }

  router = () => {
    const path = window.location.hash.slice(1);
    const route = this.routes[path] ? this.routes[path] : this.routes['404'];
    const module = new route();
    module.start();
    this.view.update(module.view);
  };

  init() {
    window.addEventListener('hashchange', this.router);
    this.router();
  }
}
