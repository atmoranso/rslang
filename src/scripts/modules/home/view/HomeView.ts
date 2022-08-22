import ElementTemplate from '../../../common/ElementTemplate';
import About from './About';
import Developers from './Developers';
import Greetings from './Greetings';

export default class HomeView extends ElementTemplate {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'home');
    new Greetings(this.node);
    new About(this.node);
    new Developers(this.node);
  }
}
