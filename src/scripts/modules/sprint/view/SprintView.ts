import ElementTemplate from '../../../common/ElementTemplate';
import Board from './Board';

export default class SprintView extends ElementTemplate {
  wordsCount: ElementTemplate;

  board: Board;

  timer: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint', 'Игра Спринт');

    const boardContainer = new ElementTemplate(this.node, 'div', 'sprint__board-container');
    this.wordsCount = new ElementTemplate(boardContainer.node, 'div', 'sprint__word-count', '10');
    this.board = new Board(boardContainer.node);

    this.timer = new ElementTemplate(this.node, 'div', 'sprint__timer');
  }
}
