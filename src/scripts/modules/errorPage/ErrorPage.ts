import { Module } from '../../common/types';
import ErrorPageView from './view/ErrorPageView';

export default class ErrorPage implements Module {
  view: ErrorPageView;

  constructor() {
    this.view = new ErrorPageView(null);
  }

  start() {
    console.log('error404');
  }
}
