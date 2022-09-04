import ElementTemplate from '../../../common/ElementTemplate';
import { SprintState } from '../../../common/stateTypes';
import Board from './Board';
import CountDownWindow from './CountDownWindow';
import FinishWindow from './FinishWindow';
import StartWindow from './StartWindow';
import WaitingWindow from './WaitingWindow';

export default class SprintView extends ElementTemplate {
  score: ElementTemplate;

  startWindow: StartWindow;

  countDownWindow: CountDownWindow;

  boardContainer: ElementTemplate;

  board: Board;

  finishWindow: FinishWindow;

  timer: ElementTemplate;

  btnPlayAgain: ElementTemplate<HTMLButtonElement> | undefined;

  waitingWindow: WaitingWindow;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint', 'Игра Спринт');

    this.startWindow = new StartWindow(this.node);
    this.countDownWindow = new CountDownWindow(null);

    this.boardContainer = new ElementTemplate(null, 'div', 'sprint__board-container');
    this.score = new ElementTemplate(this.boardContainer.node, 'div', 'sprint__word-count', '0');
    this.board = new Board(this.boardContainer.node);
    this.timer = new ElementTemplate(this.boardContainer.node, 'div', 'sprint__timer', '');

    this.finishWindow = new FinishWindow(null);

    this.waitingWindow = new WaitingWindow(this.node);
  }

  showTheEnd = (state: SprintState) => {
    this.boardContainer.delete();
    this.finishWindow.update(state);
    this.node.append(this.finishWindow.node);
  };

  showWaitingWindow = () => {
    this.waitingWindow.node.classList.add('show');
  };

  hideWaitingWindow = () => {
    this.waitingWindow.node.classList.remove('show');
  };

  updateContDown = (digit: number) => {
    this.countDownWindow.update(digit);
  };

  updateGameTimer = (digit: number) => {
    this.timer.node.innerText = '' + digit;
  };

  showCountDown = () => {
    this.startWindow.delete();
    this.finishWindow.delete();
    this.node.append(this.countDownWindow.node);
  };

  hideStartWindow = () => {
    this.startWindow.delete();
  };

  showBoard = () => {
    this.hideWaitingWindow();
    this.startWindow.delete();
    this.countDownWindow.delete();
    this.finishWindow.delete();
    this.node.append(this.boardContainer.node);
  };

  updateBoard = (state: SprintState) => {
    this.board.update(state);
    this.score.node.innerText = '' + state.score;
  };
}
