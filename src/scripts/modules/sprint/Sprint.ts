import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import SprintController from './controller/SprintController';
import SprintModel from './model/SprintModel';
import SprintView from './view/SprintView';

export default class Sprint implements Module {
  model: SprintModel;

  view: SprintView;

  controller: SprintController;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.model = new SprintModel(this.state);
    this.view = new SprintView(null);
    this.controller = new SprintController(this.view, this.model);
  }

  start() {
    this.controller.start();
  }
}
