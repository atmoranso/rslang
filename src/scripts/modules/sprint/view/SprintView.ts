import ElementTemplate from '../../../common/ElementTemplate';
import Board from './Board';
import FinishWindow from './FinishWindows';
// import LevelSelect from './LevelSelect';

export default class SprintView extends ElementTemplate {
  wordsCount: ElementTemplate;

  // levelSelect: LevelSelect;

  board: Board;

  finishWindow: FinishWindow;

  timer: ElementTemplate;

  btnPlayAgain: ElementTemplate<HTMLButtonElement> | undefined;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint', 'Игра Спринт');

    const boardContainer = new ElementTemplate(this.node, 'div', 'sprint__board-container');
    this.wordsCount = new ElementTemplate(boardContainer.node, 'div', 'sprint__word-count', '10');
    // this.levelSelect = new LevelSelect(boardContainer.node);
    this.board = new Board(boardContainer.node);
    this.finishWindow = new FinishWindow(null);

    this.timer = new ElementTemplate(this.node, 'div', 'sprint__timer');
  }

  // update(isFinished: boolean) {}

  showTheEnd = () => {
    this.board.delete();
    this.wordsCount.node.after(this.finishWindow.node);
  };

  showBoard = () => {
    this.finishWindow.delete();
    this.wordsCount.node.after(this.board.node);
  };

  updateBoard = (wordEn: string, wordRu: string) => {
    this.board.update(wordEn, wordRu);
  };
}
