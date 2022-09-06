import ElementTemplate from '../../../common/ElementTemplate';

export default class SignUp extends ElementTemplate {
  regForm: ElementTemplate<HTMLFormElement>;

  nameContainer: ElementTemplate;

  emailContainer: ElementTemplate;

  passContainer: ElementTemplate;

  nameLabel: ElementTemplate<HTMLLabelElement>;

  emailLabel: ElementTemplate<HTMLLabelElement>;

  passLabel: ElementTemplate<HTMLLabelElement>;

  nameInput: ElementTemplate<HTMLInputElement>;

  emailInput: ElementTemplate<HTMLInputElement>;

  passInput: ElementTemplate<HTMLInputElement>;

  regButton: ElementTemplate<HTMLButtonElement>;

  nameError: ElementTemplate;

  emailError: ElementTemplate;

  passError: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'account__registration');
    this.regForm = new ElementTemplate(this.node, 'form', 'form');
    this.nameContainer = new ElementTemplate(this.regForm.node, 'div', 'form__container');
    this.nameLabel = new ElementTemplate(this.nameContainer.node, 'label', 'form__label', 'Имя');
    this.nameLabel.node.htmlFor = 'name';
    this.nameInput = new ElementTemplate(this.nameContainer.node, 'input', 'form__input');
    this.nameInput.node.type = 'text';
    this.nameInput.node.id = 'name';
    this.nameError = new ElementTemplate(this.nameContainer.node, 'div', 'form__error-message');
    this.emailContainer = new ElementTemplate(this.regForm.node, 'div', 'form__container');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'form__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'form__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.emailInput.node.placeholder = 'frank@gmail.com';
    this.emailError = new ElementTemplate(this.emailContainer.node, 'div', 'form__error-message');
    this.passContainer = new ElementTemplate(this.regForm.node, 'div', 'form__container');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'form__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'form__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.passInput.node.placeholder = '********';
    this.passError = new ElementTemplate(this.passContainer.node, 'div', 'form__error-message');
    this.regButton = new ElementTemplate(this.regForm.node, 'button', 'form__button', 'Создать аккаунт');
  }
}
