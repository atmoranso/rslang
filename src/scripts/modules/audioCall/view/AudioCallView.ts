import ElementTemplate from '../../../common/ElementTemplate';
import CountDownWindow from './CountDownWindow';
import StartWindow from './StartWindow';


export default class AudioCallView extends ElementTemplate {
  startWindow: StartWindow;

  countDownWindow: CountDownWindow;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'sprint', 'Игра Аудиивызов');
    this.startWindow = new StartWindow(this.node);
    this.countDownWindow = new CountDownWindow(null);
  }

}