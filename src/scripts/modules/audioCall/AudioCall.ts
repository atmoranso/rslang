import ElementTemplate from '../../common/ElementTemplate';
import { Module } from '../../common/types';
import AudioCallView from './view/AudioCallView';

export default class AudioCall implements Module {
  view: ElementTemplate;

  constructor() {
    this.view = new AudioCallView(null);
  }

  start() {}
}
