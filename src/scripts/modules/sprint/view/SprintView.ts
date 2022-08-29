import ElementTemplate from '../../../common/ElementTemplate';
import Board from './Board';
import FinishWindow from './FinishWindows';
// import LevelSelect from './LevelSelect';

export default class SprintView extends ElementTemplate {
  score: ElementTemplate;

  // levelSelect: LevelSelect;

  board: Board;

  finishWindow: FinishWindow;

  timer: ElementTemplate;

  btnPlayAgain: ElementTemplate<HTMLButtonElement> | undefined;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint', 'Игра Спринт');

    const boardContainer = new ElementTemplate(this.node, 'div', 'sprint__board-container');
    this.score = new ElementTemplate(boardContainer.node, 'div', 'sprint__word-count', '0');
    // this.levelSelect = new LevelSelect(boardContainer.node);
    this.board = new Board(boardContainer.node);
    this.finishWindow = new FinishWindow(null);

    this.timer = new ElementTemplate(this.node, 'div', 'sprint__timer');
  }

  // update(isFinished: boolean) {}

  showTheEnd = () => {
    this.board.delete();
    this.score.node.after(this.finishWindow.node);
  };

  showBoard = () => {
    this.finishWindow.delete();
    this.score.node.after(this.board.node);
  };

  updateBoard = (wordEn: string, wordRu: string) => {
    this.board.update(wordEn, wordRu);
  };

  updateWordsCount = (score: string) => {
    this.score.node.innerText = score;
  };

  beforeStart = () => {
    this.updateWordsCount('0');
  };
}
