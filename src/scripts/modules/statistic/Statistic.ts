import ElementTemplate from '../../common/ElementTemplate';
import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import StatisticView from './view/StatisticView';

export default class Statistic implements Module {
  view: ElementTemplate;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;

    this.view = new StatisticView(null);
  }

  start() {}
}
