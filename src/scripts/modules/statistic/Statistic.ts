import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import StatisticView from "./view/StatisticView";

export default class Statistic implements Module {
  view: ElementTemplate;

  constructor() {
    this.view = new StatisticView(null);
  }

  start() {}
}
