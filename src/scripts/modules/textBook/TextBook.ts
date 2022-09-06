import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import TextbookView from './view/TextbookView';
import { AppState } from '../../common/stateTypes';

export default class Textbook implements Module {
  view: ElementTemplate;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;

    this.view = new TextbookView(null, state);
  }

  start() {}
}
