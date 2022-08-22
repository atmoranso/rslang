// import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
// import HomeView from '../../modules/home/view/HomeView';

export default class Home implements Module {
  // view: ElementTemplate;
  // constructor() {
  //   this.view = new HomeView();
  // }
  start() {
    console.log('Home module has started');
  }
}
