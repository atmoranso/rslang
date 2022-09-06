import AuthorizationView from './view/AuthorizationView';
import AuthorizationModel from './model/AuthorizationModel';
import AuthorizationController from './controller/AuthorizationController';
import { Module } from '../../common/types';
import { AppState } from '../../common/stateTypes';

export default class AuthorizationModule implements Module {
  view: AuthorizationView;

  model: AuthorizationModel;

  controller: AuthorizationController;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.view = new AuthorizationView(null);
    this.model = new AuthorizationModel(this.state);
    this.controller = new AuthorizationController(this.view, this.model);
  }

  start() {}
}
