import StatisticModel from '../model/StatisticModel';
import StatisticView from '../view/StatisticView';

export default class StatisticController {
  private model: StatisticModel;

  private view: StatisticView;

  constructor(model: StatisticModel, view: StatisticView) {
    this.model = model;
    this.view = view;
  }

  public start = async () => {
    await this.model.loadData();
    this.view.renderShortGamesStat(this.model.getShortGamesStat());
  };
}
