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
    // this.view.showCountDown();
    // await this.model.setStartTimer(true, 3, this.view.updateContDown);
    this.model.setNextWord(this.view.updateBoard);
    this.clickAudio();
    this.view.board.audio.node.addEventListener('click', this.clickAudio);
    this.view.board.btnDontKnow.node.addEventListener('click', this.clickDontKnowHandler);
    window.removeEventListener('keydown', this.clickPlayAgainHandler);
  };

  setListeners = () => {
    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });
    this.view.board.wordRu.forEach((wordEl, i) => {
      wordEl.node.addEventListener('click', (e) => {
        this.wordClickHandler(i, e);
      });
    });
    window.addEventListener('keydown', this.clickDontKnowHandler);

    window.addEventListener('keydown', this.clickKeyHandler);
    this.view.board.btnNext.node.addEventListener('click', this.clickNextHandler);
    // this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    // document.addEventListener('keydown', this.clickTrueHandler);

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickKeyHandler = (e: KeyboardEvent) => {
    if (+e.key > 0 && +e.key <= 5) {
      e.preventDefault();
      window.removeEventListener('keydown', this.clickKeyHandler);
      window.removeEventListener('keydown', this.clickDontKnowHandler);
      window.addEventListener('keydown', this.clickNextHandler);
      this.model.checkAnswer(this.view.board.showAnswer, +e.key);
      this.view.board.disableButtons();
      this.view.board.showNextBtn();
    }
  };

  wordClickHandler = (answer: number, e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener('keydown', this.clickKeyHandler);
    window.removeEventListener('keydown', this.clickDontKnowHandler);
    window.addEventListener('keydown', this.clickNextHandler);
    this.model.checkAnswer(this.view.board.showAnswer, answer + 1);
    this.view.board.disableButtons();
    this.view.board.showNextBtn();
  };

  clickNextHandler = (e: MouseEvent | KeyboardEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keydown' && e.code === 'Space')) {
      this.view.board.enableButtons();
      window.addEventListener('keydown', this.clickKeyHandler);
      window.removeEventListener('keydown', this.clickNextHandler);
      window.addEventListener('keydown', this.clickDontKnowHandler);

      if (!this.model.state.isGameFinished) {
        this.model.setNextWord(this.view.updateBoard);
        this.clickAudio();
      } else {
        this.finishGame();
      }
      this.view.board.showDontKnowBtn();
    }
  };

  clickAudio = () => {
    this.view.board.btnDontKnow.node.disabled = true;
    this.view.board.btnNext.node.disabled = true;
    this.model.playPauseWord(this.view.board.playPauseWord);
    if (this.view.board.audioSrc)
      this.view.board.audioSrc.addEventListener('ended', () => {
        this.view.board.btnNext.node.disabled = false;
        this.view.board.btnDontKnow.node.disabled = false;

        this.view.board.changePlayIcon(true);
        this.model.isPLaying = false;
      });
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
      window.removeEventListener('keydown', this.clickDontKnowHandler);
      window.addEventListener('keydown', this.clickNextHandler);
      window.removeEventListener('keydown', this.clickKeyHandler);
      this.model.checkAnswer(this.view.board.showAnswer, 0);
      this.view.board.showNextBtn();
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
    window.removeEventListener('keydown', this.clickDontKnowHandler);
    window.removeEventListener('keydown', this.clickNextHandler);
    window.removeEventListener('keydown', this.clickKeyHandler);
    window.addEventListener('keydown', this.clickPlayAgainHandler);
  };
}
