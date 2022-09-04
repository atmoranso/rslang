import { AppState } from '../../common/stateTypes';
import { Module } from '../../common/types';
import AudioCallController from './controller/AudioCallController';
import AudioCallModel from './model/AudioCallModel';
import AudioCallView from './view/AudioCallView';

export default class AudioCall implements Module {
  view: AudioCallView;

  model: AudioCallModel;

  controller: AudioCallController;

  state: AppState;

  constructor(state: AppState) {
    this.state = state;
    this.model = new AudioCallModel(this.state);
    this.view = new AudioCallView(null);
    this.controller = new AudioCallController(this.view, this.model);
  }

  start() {
    this.controller.start();
  }
}
