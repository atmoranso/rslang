import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import ErrorPageView from './view/ErrorPageView';

export default class ErrorPage implements Module {
  view: ErrorPageView;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.view = new ErrorPageView(null);
  }

  start() {
    console.log('error404');
  }
}
