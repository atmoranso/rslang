import { Module } from '../../common/types';
import SprintController from './controller/SprintController';
import SprintModel from './model/SprintModel';
import SprintView from './view/SprintView';

export default class Sprint implements Module {
  model: SprintModel;

  view: SprintView;

  controller: SprintController;

  constructor() {
    this.model = new SprintModel();
    this.view = new SprintView(null);
    this.controller = new SprintController(this.view, this.model);
  }

  start() {
    this.controller.start();
  }
}
