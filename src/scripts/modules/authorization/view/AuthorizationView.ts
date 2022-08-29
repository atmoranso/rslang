import ElementTemplate from '../../../common/ElementTemplate';
import SignIn from './SignIn';
import SignUp from './SignUp';
import crossSvg from './cross-svg.svg';
import img from './account-img.svg';

export default class AuthorizationView extends ElementTemplate {
  signIn: SignIn;

  signUp: SignUp;

  image: ElementTemplate<HTMLImageElement>;

  enterButton: ElementTemplate<HTMLButtonElement>;

  regButton: ElementTemplate<HTMLButtonElement>;

  closeButton: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'account');
    this.image = new ElementTemplate(this.node, 'div', 'account__img');
    this.image.node.innerHTML = img;
    this.enterButton = new ElementTemplate(this.node, 'button', 'account__button active', 'Войти');
    const regBtnContainer = new ElementTemplate(this.node, 'div', 'account__button-container');
    new ElementTemplate(regBtnContainer.node, 'span', 'account__text', 'или');
    this.regButton = new ElementTemplate(regBtnContainer.node, 'button', 'account__button', 'Зарегистрироваться');
    this.closeButton = new ElementTemplate(this.node, 'button', 'account__close-button');
    this.closeButton.node.innerHTML = crossSvg;
    this.signIn = new SignIn(this.node);
    this.signUp = new SignUp(null);
  }

  update() {}
}
