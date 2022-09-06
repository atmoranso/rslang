import ElementTemplate from '../../../common/ElementTemplate';
import { AudioCallState } from '../../../common/stateTypes';
import Board from './Board';
import CountDownWindow from './CountDownWindow';
import FinishWindow from './FinishWindow';
import NoWordsWindow from './NoWordsWindow';
import StartWindow from './StartWindow';
import WaitingWindow from './WaitingWindow';

export default class AudioCallView extends ElementTemplate {
  startWindow: StartWindow;

  hints: ElementTemplate | undefined;

  rules: ElementTemplate | undefined;

  countDownWindow: CountDownWindow;

  waitingWindow: WaitingWindow;

  board: Board;

  finishWindow: FinishWindow;

  noWordsWindow: NoWordsWindow;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'audiocall', 'АУДИОВЫЗОВ');
    this.startWindow = new StartWindow(this.node);
    this.countDownWindow = new CountDownWindow(null);
    this.board = new Board(null);

    this.finishWindow = new FinishWindow(null);

    this.noWordsWindow = new NoWordsWindow(null);

    this.waitingWindow = new WaitingWindow(this.node);
  }

  showTheEnd = (state: AudioCallState) => {
    this.hints?.delete();
    this.board.delete();
    this.finishWindow.update(state);
    this.node.append(this.finishWindow.node);
  };

  shownoWordsWindow = () => {
    this.node.append(this.finishWindow.node);
  };

  showWaitingWindow = () => {
    this.waitingWindow.node.classList.add('show');
  };

  hideWaitingWindow = () => {
    this.waitingWindow.node.classList.remove('show');
  };

  showCountDown = () => {
    this.startWindow.delete();
    this.finishWindow.delete();
    this.node.append(this.countDownWindow.node);
  };

  updateContDown = (digit: number) => {
    this.countDownWindow.update(digit);
  };

  hideStartWindow = () => {
    this.startWindow.delete();
  };

  showBoard = () => {
    this.hideWaitingWindow();
    this.startWindow.delete();
    this.countDownWindow.delete();
    this.finishWindow.delete();
    this.node.append(this.board.node);

    this.rules = new ElementTemplate(
      null,
      'div',
      'rules',
      '<b>Правила игры:</b><br> выберите из предложенных вариантов ответа правильный перевод услышанного слова',
    );

    this.hints = new ElementTemplate(
      null,
      'div',
      'hints',
      'Управление с клавиатуры:<br> варианты ответов: <b>1-5</b><br>"Не знаю", "Далее", "Новая игра": <b>Space</b>',
    );

    this.board.node.before(this.rules.node);
    this.board.node.after(this.hints.node);
  };

  updateBoard = (state: AudioCallState) => {
    this.board.update(state);
  };
}
