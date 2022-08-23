import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import AuthorizationView from './view/AuthorizationView';

export default class Authorization implements Module {
  view: ElementTemplate;

  constructor(parentNode: HTMLElement) {
    this.view = new AuthorizationView(parentNode);
  }

  start() {}
}
