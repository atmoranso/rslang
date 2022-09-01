import ElementTemplate from '../../common/ElementTemplate';
import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import HomeView from '../../modules/home/view/HomeView';

export default class Home implements Module {
  view: ElementTemplate;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.view = new HomeView(null);
  }

  start() {}
}
