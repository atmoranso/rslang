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

    document.addEventListener('keydown', this.clickDontKnowHandler);
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

    this.view.board.btnNext.node.addEventListener('click', this.clickNextHandler);
    // this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    // document.addEventListener('keydown', this.clickTrueHandler);

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  wordClickHandler = (answer: number, e: MouseEvent | KeyboardEvent) => {
    if (e.type === 'click') {
      e.preventDefault();

      this.model.checkAnswer(this.view.board.showAnswer, answer + 1);
      this.view.board.disableButtons();
      this.view.board.showNextBtn();
    }
  };

  clickNextHandler = () => {
    this.view.board.enableButtons();

    if (!this.model.state.isGameFinished) {
      this.model.setNextWord(this.view.updateBoard);
      this.clickAudio();
    } else {
      this.finishGame();
    }
    this.view.board.showDontKnowBtn();
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
    document.removeEventListener('keydown', this.clickDontKnowHandler);
  };
}
