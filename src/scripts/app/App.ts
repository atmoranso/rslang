import AppController from './controller/AppController';
import AppModel from './model/AppModel';
import AppView from './view/AppView';

export default class App {
  appView: AppView;
  appController: AppController;
  appModel: AppModel;
  constructor() {
    this.appView = new AppView();
    this.appModel = new AppModel();
    this.appController = new AppController(this.appView, this.appModel);
  }
  start() {
    this.appController.start();
  }
}
