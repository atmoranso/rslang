import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import TextbookView from './view/TextbookView';

export default class Textbook implements Module {
  view: ElementTemplate;

  constructor() {
    this.view = new TextbookView(null);
  }

  start() {}
}
