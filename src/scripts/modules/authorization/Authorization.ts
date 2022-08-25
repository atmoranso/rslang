import { Module } from '../../common/types';
import AuthorizationView from './view/AuthorizationView';
import AuthorizationController from './controller/AuthorizationController';
import AuthorizationModel from './model/AuthorizationModel';

export default class Authorization implements Module {
  view: AuthorizationView;

  model: AuthorizationModel;

  controller: AuthorizationController;

  constructor(parentNode: HTMLElement) {
    this.view = new AuthorizationView(parentNode);
    this.model = new AuthorizationModel();
    this.controller = new AuthorizationController(this.view, this.model);
  }

  start() {}
}
