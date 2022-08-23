import ElementTemplate from '../../../common/ElementTemplate';
import User from '../../../common/api/models/User.model';
import DataAPI from '../../../common/api/DataAPI';

export default class SingUpView extends ElementTemplate {
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

  user: User;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'registration');
    this.regForm = new ElementTemplate(this.node, 'form', 'reg-form');
    // Имя
    this.nameContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container name');
    this.nameLabel = new ElementTemplate(this.nameContainer.node, 'label', 'name__label', 'Имя');
    this.nameLabel.node.htmlFor = 'name';
    this.nameInput = new ElementTemplate(this.nameContainer.node, 'input', 'name__input');
    this.nameInput.node.type = 'text';
    this.nameInput.node.id = 'name';
    this.nameInput.node.required = true;
    // Email
    this.emailContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container email');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'email__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'email__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.emailInput.node.required = true;
    this.emailInput.node.placeholder = 'frank@gmail.com';
    // Пароль
    this.passContainer = new ElementTemplate(this.regForm.node, 'div', 'reg-form__container pass');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'pass__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'pass__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.passInput.node.required = true;
    this.passInput.node.placeholder = '********';
    // Кнопка
    this.regButton = new ElementTemplate(this.regForm.node, 'button', 'reg-form__button', 'Создать аккаунт');

    this.user = {} as User;

    this.getNewUser();

    this.regButton.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.getNewUser();
      this.createNewUser(this.getNewUser());
    });
  }

  getNewUser() {
    this.user.name = this.nameInput.node.value;
    this.user.email = this.emailInput.node.value;
    this.user.password = this.passInput.node.value;
    return this.user;
  }

  private createNewUser = async (user: User) => {
    const res = await DataAPI.createUser(user);
    console.log(res);
  };
}
