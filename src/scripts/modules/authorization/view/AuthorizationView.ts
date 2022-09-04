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

  accountOverlay: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'account');
    this.accountOverlay = new ElementTemplate(this.node, 'div', 'account__overlay');
    this.image = new ElementTemplate(this.accountOverlay.node, 'div', 'account__img');
    this.image.node.innerHTML = img;
    this.enterButton = new ElementTemplate(this.accountOverlay.node, 'button', 'account__button active', 'Войти');
    const regBtnContainer = new ElementTemplate(this.accountOverlay.node, 'div', 'account__button-container');
    new ElementTemplate(regBtnContainer.node, 'span', 'account__text', 'или');
    this.regButton = new ElementTemplate(regBtnContainer.node, 'button', 'account__button', 'Зарегистрироваться');
    this.closeButton = new ElementTemplate(this.accountOverlay.node, 'button', 'account__close-button');
    this.closeButton.node.innerHTML = crossSvg;
    this.signIn = new SignIn(this.accountOverlay.node);
    this.signUp = new SignUp(null);
  }

  resetAuthForm() {
    this.signIn.authForm.node.reset();
  }

  showSignUpWindow() {
    this.enterButton.node.classList.remove('active');
    this.regButton.node.classList.add('active');
    this.signIn.emailError.node.textContent = '';
    this.signIn.passError.node.textContent = '';
    this.signIn.node.remove();
    this.signUp.regForm.node.reset();
    this.accountOverlay.node.append(this.signUp.node);
  }

  showSignInWindow() {
    this.regButton.node.classList.remove('active');
    this.enterButton.node.classList.add('active');
    this.signUp.emailError.node.textContent = '';
    this.signUp.nameError.node.textContent = '';
    this.signUp.passError.node.textContent = '';
    this.signUp.node.remove();
    this.signIn.authForm.node.reset();
    this.accountOverlay.node.append(this.signIn.node);
  }

  showSignUpErrors(str: string) {
    if (!str) {
      this.signUp.regForm.node.reset();
      this.signIn.authForm.node.reset();
      this.signUp.node.remove();
      this.accountOverlay.node.append(this.signIn.node);
    } else if (str === '* Пользователь с таким email существует') {
      this.signUp.passError.node.textContent = '';
      this.signUp.emailError.node.textContent = str;
    }
  }

  showSignInErrors(str: string) {
    if (!str) {
      this.accountOverlay.node.remove();
    } else if (str === '* Пользователь с таким email не существует') {
      this.signIn.emailError.node.textContent = str;
      this.signIn.passError.node.textContent = '';
    } else if (str === '* Введен неправильный пароль') {
      this.signIn.emailError.node.textContent = '';
      this.signIn.passError.node.textContent = str;
    }
  }

  showGetAuthDataErrors(str: string) {
    if (str === '* Невалидный email') {
      this.signIn.emailError.node.textContent = str;
    } else if (str === '* Пароль не может быть пустым') {
      this.signIn.emailError.node.textContent = '';
      this.signIn.passError.node.textContent = str;
    }
  }

  showGetNewUserErrors(str: string) {
    if (str === '* Укажите имя') {
      this.signUp.nameError.node.textContent = str;
    } else if (str === '* Невалидный email') {
      this.signUp.nameError.node.textContent = '';
      this.signUp.emailError.node.textContent = str;
    } else if (str === '* Длина пароля 8 символов') {
      this.signUp.emailError.node.textContent = '';
      this.signUp.passError.node.textContent = str;
    }
  }
}
