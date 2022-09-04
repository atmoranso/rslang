import AudioCallModel from '../model/AudioCallModel';
import AudioCallView from '../view/AudioCallView';

export default class AudioCallController {
  model: AudioCallModel;

  view: AudioCallView;

  constructor(view: AudioCallView, model: AudioCallModel) {
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
    this.view.board.audio.node.addEventListener('click', this.clickAudio);

    this.view.board.btnDontKnow.node.addEventListener('click', this.clickDontKnowHandler);
    document.addEventListener('keydown', this.clickDontKnowHandler);
  };

  setListeners = () => {
    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });
    // this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    // document.addEventListener('keydown', this.clickTrueHandler);

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickLevelHandler = (level: number) => {
    this.model.setLevel(level);
    this.startGame().then(() => {
      this.view.showBoard();
    });
  };

  clickDontKnowHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keydown' && e.code === 'Space')) {
      e.preventDefault();

      this.model.checkAnswer(0);
      if (!this.model.state.isGameFinished) this.model.setNextWord(this.view.updateBoard);
      else {
        this.finishGame();
      }
    }
  };

  clickPlayAgainHandler = () => {
    this.startGame().then(() => {
      this.view.showBoard();
    });
  };

  finishGame = () => {
    this.model.finishGame(this.view.showTheEnd);

    this.view.board.btnDontKnow.node.removeEventListener('click', this.clickDontKnowHandler);
    document.removeEventListener('keydown', this.clickDontKnowHandler);
    this.view.btnPlayAgain?.node.removeEventListener('click', this.clickPlayAgainHandler);
  };
}
