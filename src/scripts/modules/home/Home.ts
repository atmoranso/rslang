import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import HomeView from '../../modules/home/view/HomeView';

export default class Home implements Module {
  view: HomeView;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.view = new HomeView(null);
    if (!state.authorization.isAuth) {
      if (this.view.about.statLink?.href) {
        this.view.about.statLink.href = '#';
      }
    }
  }

  start() {}
}
