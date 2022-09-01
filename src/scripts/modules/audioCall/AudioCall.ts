import ElementTemplate from '../../common/ElementTemplate';
import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import AudioCallView from './view/AudioCallView';

export default class AudioCall implements Module {
  view: ElementTemplate;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;

    this.view = new AudioCallView(null);
  }

  start() {}
}
