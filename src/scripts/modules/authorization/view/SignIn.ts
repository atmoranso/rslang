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

  emailError: ElementTemplate;

  passError: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'account__authorization');
    this.authForm = new ElementTemplate(this.node, 'form', 'form');
    this.emailContainer = new ElementTemplate(this.authForm.node, 'div', 'form__container');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'form__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'form__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.emailError = new ElementTemplate(this.emailContainer.node, 'div', 'form__error-message');
    this.passContainer = new ElementTemplate(this.authForm.node, 'div', 'form__container');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'form__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'form__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.passError = new ElementTemplate(this.passContainer.node, 'div', 'form__error-message');
    this.authButton = new ElementTemplate(this.authForm.node, 'button', 'form__button', 'Войти');
  }
}
