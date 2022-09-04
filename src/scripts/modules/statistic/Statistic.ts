import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import StatisticModel from './model/StatisticModel';
import StatisticView from './view/StatisticView';
import StatisticController from './controller/StatisticController';

export default class Statistic implements Module {
  private model: StatisticModel;

  public view: StatisticView;

  private controller: StatisticController;

  public state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.model = new StatisticModel(this.state);
    this.view = new StatisticView(null);
    this.controller = new StatisticController(this.model, this.view);
  }

  public start = () => {
    if (this.state.authorization.isAuth) {
      this.controller.start();
    }
  };
}
