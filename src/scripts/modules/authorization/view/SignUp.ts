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

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'registration');

    this.regForm = new ElementTemplate(this.node, 'form', 'reg-form');
    this.nameContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container name');
    this.nameLabel = new ElementTemplate(this.nameContainer.node, 'label', 'name__label', 'Имя');
    this.nameLabel.node.htmlFor = 'name';
    this.nameInput = new ElementTemplate(this.nameContainer.node, 'input', 'name__input');
    this.nameInput.node.type = 'text';
    this.nameInput.node.id = 'name';
    this.emailContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container email');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'email__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'email__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.emailInput.node.placeholder = 'frank@gmail.com';
    this.passContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container pass');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'pass__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'pass__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.passInput.node.placeholder = '********';
    this.regButton = new ElementTemplate(this.regForm.node, 'button', 'reg-form__button', 'Создать аккаунт');
  }
}
