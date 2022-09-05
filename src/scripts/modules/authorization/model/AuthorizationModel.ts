import User from '../../../common/api/models/User.model';
import DataAPI from '../../../common/api/DataAPI';
import UserAuth from '../../../common/api/models/UserAuth.model';
import { AppState } from '../../../common/stateTypes';

export default class AuthorizationModel {
  user: UserAuth | undefined;

  state: AppState;

  passMinLength = 8;

  constructor(state: AppState) {
    this.state = state;
  }

  private reloadHash = () => {
    const currentHash = window.location.hash === '#statistics' ? '#' : window.location.hash;
    window.location.hash = '#404';
    window.location.hash = currentHash;
  };

  async logInUser(user: Pick<User, 'email' | 'password'>) {
    const res = await DataAPI.signIn(user);
    if (res.status == 404) {
      return '* Пользователь с таким email не существует';
    }
    if (res.status == 403) {
      return '* Введен неправильный пароль';
    }
    if (!res.status) {
      this.state.authorization.isAuth = true;
      this.state.authorization.name = res.name;
      this.state.authorization.token = res.token;
      this.state.authorization.refreshToken = res.refreshToken;
      this.state.authorization.userId = res.userId;
      this.state.authorization.date = Date.now();
      localStorage.setItem('rsLang-appState-DT', JSON.stringify(this.state));
      this.reloadHash();
    }
    return '';
  }

  getUserName() {
    return this.state.authorization.name;
  }

  logOutUser() {
    this.state.authorization.isAuth = false;
    this.state.authorization.name = '';
    this.state.authorization.token = '';
    this.state.authorization.refreshToken = '';
    this.state.authorization.userId = '';
    this.state.authorization.date = 0;
    localStorage.setItem('rsLang-appState-DT', JSON.stringify(this.state));
    clearInterval(this.state.authorization.timeoutId);
    this.reloadHash();
  }

  async createUser(user: User) {
    const res = await DataAPI.createUser(user);
    return res.status ? '* Пользователь с таким email существует' : '';
  }

  authDataValidate(user: Pick<User, 'email' | 'password'>) {
    const email = user.email;
    const password = user.password;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return '* Невалидный email';
    }
    if (!password) {
      return '* Пароль не может быть пустым';
    }
    return '';
  }

  regDataValidate(user: User) {
    const name = user.name;
    const email = user.email;
    const password = user.password;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!name) {
      return '* Укажите имя';
    }
    if (!re.test(String(email).toLowerCase())) {
      return '* Невалидный email';
    }
    if (password.length < this.passMinLength) {
      return '* Длина пароля 8 символов';
    }
    return '';
  }

  updateToken() {
    const limitTokenTime = 3.95 * 3600000;
    const userId = this.state.authorization.userId;
    const timeoutId = window.setInterval(async () => {
      const res = await DataAPI.getNewToken(this.state.authorization.refreshToken, userId);
      this.state.authorization.token = res.token;
      this.state.authorization.refreshToken = res.refreshToken;
      this.state.authorization.timeoutId = timeoutId;
      this.state.authorization.date = Date.now();
      console.log(this.state.authorization.token);
      console.log('ccc');

      localStorage.setItem('rsLang-appState-DT', JSON.stringify(this.state));
    }, limitTokenTime);
  }

  async checkToken() {
    if (this.state.authorization.isAuth) {
      const userId = this.state.authorization.userId;
      const res = await DataAPI.getNewToken(this.state.authorization.refreshToken, userId);
      this.state.authorization.token = res.token;
      this.state.authorization.refreshToken = res.refreshToken;
      this.state.authorization.date = Date.now();
      localStorage.setItem('rsLang-appState-DT', JSON.stringify(this.state));
      this.updateToken();
      return true;
    }
    return false;
  }
}
