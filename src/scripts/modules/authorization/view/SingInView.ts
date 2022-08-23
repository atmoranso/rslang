import ElementTemplate from '../../../common/ElementTemplate';
import DataAPI from '../../../common/api/DataAPI';
import User from '../../../common/api/models/User.model';

export default class SingInView extends ElementTemplate {
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
    // Email
    this.emailContainer = new ElementTemplate(this.authForm.node, 'div', 'auth-form__container email');
    this.emailLabel = new ElementTemplate(this.emailContainer.node, 'label', 'email__label', 'Email');
    this.emailLabel.node.htmlFor = 'email';
    this.emailInput = new ElementTemplate(this.emailContainer.node, 'input', 'email__input');
    this.emailInput.node.type = 'email';
    this.emailInput.node.id = 'email';
    this.emailInput.node.required = true;
    // Пароль
    this.passContainer = new ElementTemplate(this.authForm.node, 'div', 'auth-form__container pass');
    this.passLabel = new ElementTemplate(this.passContainer.node, 'label', 'pass__label', 'Пароль');
    this.passLabel.node.htmlFor = 'pass';
    this.passInput = new ElementTemplate(this.passContainer.node, 'input', 'pass__input');
    this.passInput.node.type = 'pass';
    this.passInput.node.id = 'pass';
    this.passInput.node.required = true;
    // Кнопка
    this.authButton = new ElementTemplate(this.authForm.node, 'button', 'auth-form__button', 'Войти');

    this.authButton.node.addEventListener('click', (event) => {
      event.preventDefault();
      const user = { email: this.emailInput.node.value, password: this.passInput.node.value };
      this.logInUser(user);
    });
  }

  private logInUser = async (user: Pick<User, 'email' | 'password'>) => {
    const res = await DataAPI.signIn(user);
    localStorage.setItem(
      'user',
      JSON.stringify({ isAuth: 'true', name: res.name, token: res.token, userId: res.userId }),
    );
  };
}
