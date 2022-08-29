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
    this.view.beforeStart();
    this.setListeners();
  };

  setListeners = () => {
    this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    this.view.board.btnFalse.node.addEventListener('click', this.clickFalseHandler);
    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickTrueHandler = () => {
    this.model.checkAnswer(true, this.view.updateWordsCount);
    if (!this.model.isGameFinished) {
      this.model.setNextWord(this.view.updateBoard);
    } else {
      this.finishGame();
    }
  };

  clickFalseHandler = () => {
    this.model.checkAnswer(false, this.view.updateWordsCount);
    if (!this.model.isGameFinished) this.model.setNextWord(this.view.updateBoard);
    else {
      this.finishGame();
    }
  };

  finishGame = () => {
    this.view.showTheEnd();
    this.view.btnPlayAgain?.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickPlayAgainHandler = () => {
    this.view.showBoard();
    this.start();
  };
}
