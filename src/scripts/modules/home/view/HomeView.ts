import ElementTemplate from '../../../common/ElementTemplate';
import About from './About';
import Developers from './Developers';
import Greetings from './Greetings';

export default class HomePageView extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'home');
    new Greetings(this.node);
    new About(this.node);
    new Developers(this.node);
  }
}
