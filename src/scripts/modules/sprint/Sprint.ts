import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import SprintView from "./view/SprintView";

export default class Sprint implements Module {
  view: ElementTemplate;

  constructor() {
    this.view = new SprintView(null);
  }

  start() {}
}
