import ElementTemplate from '../../../common/ElementTemplate';
import SignIn from './SignIn';
import SignUp from './SignUp';
import User from '../../../common/api/models/User.model';
import DataAPI from '../../../common/api/DataAPI';
import state from '../../../common/state';
import crossSvg from './cross-svg.svg';
import img from './account-img.svg';

export default class AuthorizationView extends ElementTemplate {
  signIn: SignIn;

  signUp: SignUp;

  image: ElementTemplate<HTMLImageElement>;

  enterButton: ElementTemplate<HTMLButtonElement>;

  regButton: ElementTemplate<HTMLButtonElement>;

  closeButton: ElementTemplate<HTMLButtonElement>;

  passMinLength = 8;

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

    this.signUp.regButton.node.addEventListener('click', async (event) => {
      event.preventDefault();
      const user = this.getNewUser();
      if (user) {
        const res = await this.createUser(user);
        if (!res.status) {
          this.signUp.regForm.node.reset();
          this.signIn.authForm.node.reset();
          this.signUp.emailError.node.textContent = '';
          this.signUp.node.remove();
          this.node.append(this.signIn.node);
        } else {
          this.signUp.emailError.node.textContent = 'Пользователь с таким email существует';
        }
      }
    });

    this.signIn.authButton.node.addEventListener('click', async (event) => {
      event.preventDefault();
      const user = this.getAuthData();
      if (user) {
        const res = await this.logInUser(user);
        if (!res.status) {
          state.isAuth = true;
          state.name = res.name;
          state.token = res.token;
          state.refreshToken = res.refreshToken;
          state.userId = res.userId;
          state.data = new Date();
          localStorage.setItem('user', JSON.stringify(state));
          this.node.remove();
          this.updateToken();
        }
        if (res.status == 404) {
          this.signIn.emailError.node.textContent = 'Пользователь с таким email не существует';
        }
        if (res.status == 403) {
          this.signIn.emailError.node.textContent = '';
          this.signIn.passError.node.textContent = 'Введен неправильный пароль';
        }
      }
    });

    this.closeButton.node.addEventListener('click', () => this.node.remove());
  }

  update() {
    this.enterButton.node.addEventListener('click', () => {
      this.regButton.node.classList.remove('active');
      this.enterButton.node.classList.add('active');
      this.signUp.emailError.node.textContent = '';
      this.signUp.nameError.node.textContent = '';
      this.signUp.passError.node.textContent = '';
      this.signUp.node.remove();
      this.signIn.authForm.node.reset();
      this.node.append(this.signIn.node);
    });
    this.regButton.node.addEventListener('click', () => {
      this.enterButton.node.classList.remove('active');
      this.regButton.node.classList.add('active');
      this.signIn.emailError.node.textContent = '';
      this.signIn.passError.node.textContent = '';
      this.signIn.node.remove();
      this.signUp.regForm.node.reset();
      this.node.append(this.signUp.node);
    });
  }

  getNewUser() {
    const name = this.signUp.nameInput.node.value;
    const email = this.signUp.emailInput.node.value;
    const password = this.signUp.passInput.node.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signUp.nameError.node.textContent = !name ? 'Укажите имя' : '';
    this.signUp.emailError.node.textContent = !re.test(String(email).toLowerCase()) ? 'Невалидный email' : '';
    this.signUp.passError.node.textContent = password.length < this.passMinLength ? 'Длина пароля 8 символов' : '';

    if (name && email && password) return { name, email, password };
  }

  getAuthData() {
    const email = this.signIn.emailInput.node.value;
    const password = this.signIn.passInput.node.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signIn.emailError.node.textContent = !re.test(String(email).toLowerCase()) ? 'Невалидный email' : '';
    this.signIn.passError.node.textContent = !password ? 'Пароль не может быть пустым' : '';

    if (email && password) return { email, password };
  }

  async createUser(user: User) {
    const res = await DataAPI.createUser(user);
    return res;
  }

  async logInUser(user: Pick<User, 'email' | 'password'>) {
    const res = await DataAPI.signIn(user);
    return res;
  }

  updateToken() {
    const limitTokenTime = 3.55 * 3600000;
    const userId = state.userId;
    const timeoutId = setInterval(async () => {
      const res = await DataAPI.getNewToken(state.refreshToken, userId);
      state.token = res.token;
      state.refreshToken = res.refreshToken;
      localStorage.setItem('user', JSON.stringify(state));
    }, limitTokenTime);
    localStorage.setItem('timeoutId', JSON.stringify(timeoutId));
  }

  async checkToken() {
    if (state.isAuth) {
      const limitTokenTime = 3.55 * 3600000;
      let startTokenData = JSON.parse(<string>localStorage.getItem('user')).data;
      const userId = state.userId;
      startTokenData = new Date(startTokenData);
      const currentData = new Date();
      const diffTime = Math.floor((+currentData - +startTokenData) * 100) / 100;

      if (diffTime >= limitTokenTime) {
        const res = await DataAPI.getNewToken(state.refreshToken, userId);
        state.token = res.token;
        state.refreshToken = res.refreshToken;
        localStorage.setItem('user', JSON.stringify(state));
        this.updateToken();
      } else {
        setTimeout(async () => {
          const res = await DataAPI.getNewToken(state.refreshToken, userId);
          state.token = res.token;
          state.refreshToken = res.refreshToken;
          localStorage.setItem('user', JSON.stringify(state));
          this.updateToken();
        }, limitTokenTime - diffTime);
      }
    }
  }
}
