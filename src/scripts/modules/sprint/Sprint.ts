import ElementTemplate from '../../common/ElementTemplate';
import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import SprintView from './view/SprintView';

export default class Sprint implements Module {
  view: ElementTemplate;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;

    this.view = new SprintView(null);
  }

  start() {}
}
