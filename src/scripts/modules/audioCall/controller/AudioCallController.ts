import AudioCallModel from '../model/AudioCallModel';
import AudioCallView from '../view/AudioCallView';

export default class AudioCallController {
  model: AudioCallModel;

  view: AudioCallView;

  isAnswerView = false;

  constructor(view: AudioCallView, model: AudioCallModel) {
    this.view = view;
    this.model = model;
  }

  start = () => {
    this.setListeners();
    this.isAnswerView = false;

    if (this.model.checkIsBeforeTextbook()) {
      this.clickPlayAgainHandler();
    }
  };

  startGame = async () => {
    this.view.hideStartWindow();
    await this.model.prepareData(this.view.showWaitingWindow);
    this.view.hideWaitingWindow();
    // if (this.model.isNoWords) {
    //   this.view.shownoWordsWindow();
    //   this.model.isNoWords = false;
    // } else {
    // this.view.showCountDown();
    // await this.model.setStartTimer(true, 3, this.view.updateContDown);
    this.model.setNextWord(this.view.updateBoard);
    this.clickAudio();
    this.isAnswerView = false;
    this.view.board.audio.node.addEventListener('click', this.clickAudio);
    this.view.board.btnDontKnow.node.addEventListener('click', this.clickDontKnowHandler);
    // }
  };

  setListeners = () => {
    this.isAnswerView = false;

    this.view.startWindow.level.forEach((btn, index) => {
      btn.node.addEventListener('click', () => this.clickLevelHandler(index));
    });
    this.view.board.wordRu.forEach((wordEl, i) => {
      wordEl.node.addEventListener('click', (e) => {
        this.wordClickHandler(i, e);
      });
    });
    // window.addEventListener('keyup', this.clickDontKnowHandler);

    // window.addEventListener('keyup', this.clickKeyHandler);
    this.view.board.btnNext.node.addEventListener('click', this.clickNextHandler);
    // this.view.board.btnTrue.node.addEventListener('click', this.clickTrueHandler);
    // document.addEventListener('keyup', this.clickTrueHandler);

    this.view.finishWindow.btnPlayAgain.node.addEventListener('click', this.clickPlayAgainHandler);
  };

  clickKeyHandler = (e: KeyboardEvent) => {
    if (+e.key > 0 && +e.key <= 5) {
      e.preventDefault();
      this.isAnswerView = true;

      window.removeEventListener('keyup', this.clickKeyHandler);
      window.removeEventListener('keyup', this.clickDontKnowHandler);
      window.addEventListener('keyup', this.clickNextHandler);
      this.model.checkAnswer(this.view.board.showAnswer, +e.key);
      this.view.board.disableButtons();
      this.view.board.showNextBtn();
    }
  };

  wordClickHandler = (answer: number, e: MouseEvent) => {
    this.isAnswerView = true;
    e.preventDefault();
    window.removeEventListener('keyup', this.clickKeyHandler);
    window.removeEventListener('keyup', this.clickDontKnowHandler);
    window.addEventListener('keyup', this.clickNextHandler, { once: true });
    this.model.checkAnswer(this.view.board.showAnswer, answer + 1);
    this.view.board.disableButtons();
    this.view.board.showNextBtn();
  };

  clickNextHandler = (e: MouseEvent | KeyboardEvent) => {
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keyup' && e.code === 'Space')) {
      this.isAnswerView = false;

      this.view.board.enableButtons();
      window.addEventListener('keyup', this.clickKeyHandler, { once: true });
      window.removeEventListener('keyup', this.clickNextHandler);
      window.addEventListener('keyup', this.clickDontKnowHandler, { once: true });

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
    if (!this.model.isPLaying) {
      window.removeEventListener('keyup', this.clickDontKnowHandler);
      window.removeEventListener('keyup', this.clickNextHandler);
      this.view.board.btnDontKnow.node.disabled = true;
      this.view.board.btnNext.node.disabled = true;
      this.view.board.wordRu.forEach((wordEl) => {
        wordEl.node.disabled = true;
      });
    } else {
      this.view.board.wordRu.forEach((wordEl) => {
        wordEl.node.disabled = false;
      });
      if (this.isAnswerView) {
        window.addEventListener('keyup', this.clickNextHandler, { once: true });
      } else {
        window.addEventListener('keyup', this.clickDontKnowHandler, { once: true });
      }
      this.view.board.btnNext.node.disabled = false;
      this.view.board.btnDontKnow.node.disabled = false;
    }

    this.model.playPauseWord(this.view.board.playPauseWord);
    if (this.view.board.audioSrc)
      this.view.board.audioSrc.addEventListener('ended', () => {
        this.view.board.wordRu.forEach((wordEl) => {
          wordEl.node.disabled = false;
        });
        if (this.isAnswerView) {
          window.addEventListener('keyup', this.clickNextHandler, { once: true });
        } else {
          window.addEventListener('keyup', this.clickDontKnowHandler, { once: true });
        }
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
    if (e.type === 'click' || (e instanceof KeyboardEvent && e.type === 'keyup' && e.code === 'Space')) {
      e.preventDefault();
      this.isAnswerView = true;

      window.removeEventListener('keyup', this.clickDontKnowHandler);
      window.addEventListener('keyup', this.clickNextHandler, { once: true });
      window.removeEventListener('keyup', this.clickKeyHandler);
      this.model.checkAnswer(this.view.board.showAnswer, 0);
      this.view.board.disableButtons();

      this.view.board.showNextBtn();
    }
  };

  clickPlayAgainHandler = () => {
    window.removeEventListener('keyup', this.clickPlayAgainHandler);

    this.startGame().then(() => {
      this.view.showBoard();
      this.isAnswerView = false;
    });
  };

  finishGame = () => {
    this.model.finishGame(this.view.showTheEnd);

    this.view.board.btnDontKnow.node.removeEventListener('click', this.clickDontKnowHandler);
    window.removeEventListener('keyup', this.clickDontKnowHandler);
    window.removeEventListener('keyup', this.clickNextHandler);
    window.removeEventListener('keyup', this.clickKeyHandler);
    window.addEventListener('keyup', this.clickPlayAgainHandler, { once: true });
  };
}
