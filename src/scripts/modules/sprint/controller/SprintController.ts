import SprintModel from '../model/SprintModel';
import SprintView from '../view/SprintView';

export default class SprintController {
  model: SprintModel;

  view: SprintView;

  constructor(view: SprintView, model: SprintModel) {
    this.view = view;

    this.model = model;
  }

  start = async () => {
    await this.model.prepareData(0);
    this.model.setNextWord(this.view.updateBoard);
    this.setListeners();
  };

  setListeners = () => {
    this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    this.view.board.btnFalse.node.addEventListener('click', this.clickFalseHandler);
    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickTrueHandler = () => {
    if (!this.model.isGameFinished) this.model.setNextWord(this.view.updateBoard);
    else {
      this.finish();
    }
  };

  clickFalseHandler = () => {
    if (!this.model.isGameFinished) this.model.setNextWord(this.view.updateBoard);
    else {
      this.finish();
    }
  };

  finish = () => {
    this.view.showTheEnd();
    this.view.btnPlayAgain?.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickPlayAgainHandler = () => {
    this.view.showBoard();
    this.start();
  };
}
