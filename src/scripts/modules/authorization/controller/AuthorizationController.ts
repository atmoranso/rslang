import AuthorizationView from '../view/AuthorizationView';
import AuthorizationModel from '../model/AuthorizationModel';

export default class AuthorizationController {
  view: AuthorizationView;

  model: AuthorizationModel;

  constructor(view: AuthorizationView, model: AuthorizationModel) {
    this.view = view;
    this.model = model;
    this.view.update();
  }
}
