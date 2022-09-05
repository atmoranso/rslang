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
    this.view.hideStartWindow();
    await this.model.prepareData(this.view.showWaitingWindow);
    this.view.hideWaitingWindow();
    this.view.showCountDown();
    await this.model.setStartTimer(true, 3, this.view.updateContDown);
    this.model.setNextWord(this.view.updateBoard);
    this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    this.view.board.audio.node.addEventListener('click', this.clickAudio);
    window.addEventListener('keyup', this.clickTrueHandler);
    this.view.board.btnFalse.node.addEventListener('click', this.clickFalseHandler);
    window.addEventListener('keyup', this.clickFalseHandler);
  };

  setListeners = () => {
    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickAudio = () => {
    this.model.playPauseWord(this.view.board.playPauseWord);
    if (this.view.board.audioSrc)
      this.view.board.audioSrc.addEventListener('ended', () => {
        console.log('aaa');

        this.view.board.changePlayIcon(true);
        this.model.isPLaying = false;
      });
  };

  clickLevelHandler = (level: number) => {
    this.model.setLevel(level);
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(false, 60, this.view.updateGameTimer);
      })
      .then((timerStatus) => {
        if (timerStatus !== 'noWords') this.finishGame();
      });
  };

  clickTrueHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keyup' && e.code === 'ArrowRight')) {
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
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keyup' && e.code === 'ArrowLeft')) {
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
    window.removeEventListener('keyup', this.clickTrueHandler);
    this.view.board.btnFalse.node.removeEventListener('click', this.clickFalseHandler);
    window.removeEventListener('keyup', this.clickFalseHandler);
  };

  clickPlayAgainHandler = () => {
    this.startGame()
      .then(() => {
        this.view.showBoard();
        return this.model.setStartTimer(false, 60, this.view.updateGameTimer);
      })
      .then((timerStatus) => {
        if (timerStatus !== 'noWords') this.finishGame();
      });
  };
}
