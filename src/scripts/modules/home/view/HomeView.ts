import ElementTemplate from '../../../common/ElementTemplate';
import About from './About';
import Developers from './Developers';
import Greetings from './Greetings';

export default class HomeView extends ElementTemplate {
  about: About;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'home');
    new Greetings(this.node);
    this.about = new About(this.node);
    new Developers(this.node);
  }
}
