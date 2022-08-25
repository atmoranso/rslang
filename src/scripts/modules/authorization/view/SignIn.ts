import ElementTemplate from '../../../common/ElementTemplate';

export default class SignIn extends ElementTemplate {
  authForm: ElementTemplate<HTMLFormElement>;

  emailContainer: ElementTemplate;

  passContainer: ElementTemplate;

  emailLabel: ElementTemplate<HTMLLabelElement>;

  passLabel: ElementTemplate<HTMLLabelElement>;

  emailInput: ElementTemplate<HTMLInputElement>;

  passInput: ElementTemplate<HTMLInputElement>;

  authButton: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'authorization');
    this.authForm = new ElementTemplate(this.node, 'form', 'auth-form');
    this.emailContainer = new ElementTemplate(this.authForm.node, 'div', 'auth-form__container email');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'email__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'email__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.passContainer = new ElementTemplate(this.authForm.node, 'div', 'auth-form__container pass');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'pass__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'pass__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.authButton = new ElementTemplate(this.authForm.node, 'button', 'auth-form__button', 'Войти');
  }
}
