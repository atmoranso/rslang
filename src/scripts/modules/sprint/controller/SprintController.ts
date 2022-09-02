import SprintModel from '../model/SprintModel';
import SprintView from '../view/SprintView';

export default class SprintController {
  model: SprintModel;

  view: SprintView;

  constructor(view: SprintView, model: SprintModel) {
    this.view = view;
    this.model = model;
  }

  start = () => {
    this.setListeners();
  };

  startGame = async () => {
    await this.model.prepareData(this.view.showWaitingWindow);
    this.view.hideWaitingWindow();
    this.view.showCountDown();
    await this.model.setStartTimer(3, this.view.updateContDown);
    this.model.setNextWord(this.view.updateBoard);
  };

  setListeners = () => {
    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });
    this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    this.view.board.btnFalse.node.addEventListener('click', this.clickFalseHandler);
    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickLevelHandler = (level: number) => {
    this.model.setLevel(level);
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(10, this.view.updateGameTimer);
      })
      .then(() => {
        this.finishGame();
      });
  };

  clickTrueHandler = () => {
    this.model.checkAnswer(true);
    if (!this.model.state.isGameFinished) {
      this.model.setNextWord(this.view.updateBoard);
    } else {
      this.finishGame();
    }
  };

  clickFalseHandler = () => {
    this.model.checkAnswer(false);
    if (!this.model.state.isGameFinished) this.model.setNextWord(this.view.updateBoard);
    else {
      this.finishGame();
    }
  };

  finishGame = () => {
    this.model.finishGame(this.view.showTheEnd);
    this.view.btnPlayAgain?.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickPlayAgainHandler = () => {
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(10, this.view.updateGameTimer);
      })
      .then(() => {
        this.finishGame();
      });
  };
}
