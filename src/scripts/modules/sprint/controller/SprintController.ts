import SprintModel from '../model/SprintModel';
import SprintView from '../view/SprintView';

export default class SprintController {
  model: SprintModel;

  view: SprintView;

  constructor(view: SprintView, model: SprintModel) {
    this.view = view;
    this.model = model;
  }

  start() {}
}
