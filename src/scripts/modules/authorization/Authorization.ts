import AuthorizationView from './view/AuthorizationView';
import AuthorizationModel from './model/AuthorizationModel';
import AuthorizationController from './controller/AuthorizationController';
import { Module } from '../../common/types';
import state from '../../common/state';

export default class Authorization implements Module {
  view: AuthorizationView;

  model: AuthorizationModel;

  controller: AuthorizationController;

  constructor() {
    this.view = new AuthorizationView(null);
    this.model = new AuthorizationModel(state);
    this.controller = new AuthorizationController(this.view, this.model);
  }

  start() {
    this.controller.start();
  }
}
