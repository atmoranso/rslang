import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import TextbookView from './view/TextbookView';
import state from '../../common/state';

export default class Textbook implements Module {
  view: ElementTemplate;

  constructor() {
    this.view = new TextbookView(null, state);
  }

  start() {}
}
