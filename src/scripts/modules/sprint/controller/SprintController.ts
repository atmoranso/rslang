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
    if (this.model.checkIsBeforeTextbook()) this.clickPlayAgainHandler();
  };

  startGame = async () => {
    await this.model.prepareData(this.view.showWaitingWindow);
    this.view.hideWaitingWindow();
    this.view.showCountDown();
    await this.model.setStartTimer(true, 3, this.view.updateContDown);
    this.model.setNextWord(this.view.updateBoard);
    this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    document.addEventListener('keydown', this.clickTrueHandler);
    this.view.board.btnFalse.node.addEventListener('click', this.clickFalseHandler);
    document.addEventListener('keydown', this.clickFalseHandler);
  };

  setListeners = () => {
    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickLevelHandler = (level: number) => {
    this.model.setLevel(level);
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(false, 10, this.view.updateGameTimer);
      })
      .then(() => {
        this.finishGame();
      });
  };

  clickTrueHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keydown' && e.code === 'ArrowRight')) {
      e.preventDefault();

      this.model.checkAnswer(true);
      if (!this.model.state.isGameFinished) {
        this.model.setNextWord(this.view.updateBoard);
      } else {
        this.finishGame();
      }
    }
  };

  clickFalseHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keydown' && e.code === 'ArrowLeft')) {
      e.preventDefault();

      this.model.checkAnswer(false);
      if (!this.model.state.isGameFinished) this.model.setNextWord(this.view.updateBoard);
      else {
        this.finishGame();
      }
    }
  };

  finishGame = () => {
    this.model.finishGame(this.view.showTheEnd);
    this.view.board.btnTrue.node.removeEventListener('click', this.clickTrueHandler);
    document.removeEventListener('keydown', this.clickTrueHandler);
    this.view.board.btnFalse.node.removeEventListener('click', this.clickFalseHandler);
    document.removeEventListener('keydown', this.clickFalseHandler);
    this.view.btnPlayAgain?.node.removeEventListener('click', this.clickPlayAgainHandler);
  };

  clickPlayAgainHandler = () => {
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(false, 10, this.view.updateGameTimer);
      })
      .then((timerStatus) => {
        if (timerStatus !== 'noWords') this.finishGame();
      });
  };
}
