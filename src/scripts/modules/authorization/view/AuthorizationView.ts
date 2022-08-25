import ElementTemplate from '../../../common/ElementTemplate';
import SignIn from './SignIn';
import SignUp from './SignUp';
import User from '../../../common/api/models/User.model';
import DataAPI from '../../../common/api/DataAPI';
import store from '../../../common/store';

export default class AuthorizationView extends ElementTemplate {
  signIn: SignIn;

  signUp: SignUp;

  enterButton: ElementTemplate<HTMLButtonElement>;

  regButton: ElementTemplate<HTMLButtonElement>;

  passMinLength = 8;

  errorMessage: ElementTemplate;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', 'account');
    this.enterButton = new ElementTemplate(this.node, 'button', '', 'Войти');
    new ElementTemplate(this.node, 'span', '', 'или');
    this.regButton = new ElementTemplate(this.node, 'button', '', 'Зарегистрироваться');
    this.errorMessage = new ElementTemplate(this.node, 'div', 'error');
    this.signIn = new SignIn(this.node);
    this.signUp = new SignUp(null);

    this.signUp.regButton.node.addEventListener('click', async (event) => {
      event.preventDefault();
      const user = this.getNewUser();
      if (user) {
        const res = await this.createUser(user);
        if (!res.status) {
          this.signUp.regForm.node.reset();
          this.signIn.authForm.node.reset();
          this.signUp.node.remove();
          this.node.append(this.signIn.node);
        } else {
          this.errorMessage.node.textContent = 'Пользователь с таким email существует';
        }
      }
    });

    this.signIn.authButton.node.addEventListener('click', async (event) => {
      event.preventDefault();
      const user = this.getAuthData();
      if (user) {
        const res = await this.logInUser(user);
        if (!res.status) {
          store.isAuth = true;
          store.name = res.name;
          store.token = res.token;
          store.refreshToken = res.refreshToken;
          store.userId = res.userId;
          store.data = new Date();
          localStorage.setItem('user', JSON.stringify(store));
          this.node.remove();
        }
        if (res.status == 404) {
          this.errorMessage.node.textContent = 'Пользователь с таким email не существует';
        }
        if (res.status == 403) {
          this.errorMessage.node.textContent = 'Введен неправильный пароль';
        }
      }
    });
  }

  getNewUser() {
    const name = this.signUp.nameInput.node.value;
    const email = this.signUp.emailInput.node.value;
    const password = this.signUp.passInput.node.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name) {
      this.errorMessage.node.textContent = 'Как тебя зовут?';
    } else if (!re.test(String(email).toLowerCase())) {
      this.errorMessage.node.textContent = 'Невалидный email';
    } else if (!password) {
      this.errorMessage.node.textContent = 'Пароль не может быть пустым';
    } else if (password.length < this.passMinLength) {
      this.errorMessage.node.textContent = 'Минимальная длина пароля 8 символов';
    } else {
      this.errorMessage.node.textContent = '';
      return { name, email, password };
    }
  }

  getAuthData() {
    const email = this.signIn.emailInput.node.value;
    const password = this.signIn.passInput.node.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      this.errorMessage.node.textContent = 'Невалидный email';
    } else if (!password) {
      this.errorMessage.node.textContent = 'Пароль не может быть пустым';
    } else {
      this.errorMessage.node.textContent = '';
      return { email, password };
    }
  }

  createUser = async (user: User) => {
    const res = await DataAPI.createUser(user);
    return res;
  };

  logInUser = async (user: Pick<User, 'email' | 'password'>) => {
    const res = await DataAPI.signIn(user);
    return res;
  };

  update() {
    this.enterButton.node.addEventListener('click', () => {
      this.errorMessage.node.textContent = '';
      this.signUp.node.remove();
      this.signIn.authForm.node.reset();
      this.node.append(this.signIn.node);
    });
    this.regButton.node.addEventListener('click', () => {
      this.errorMessage.node.textContent = '';
      this.signIn.node.remove();
      this.signUp.regForm.node.reset();
      this.node.append(this.signUp.node);
    });
  }
}
