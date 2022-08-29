import AuthorizationView from '../view/AuthorizationView';
import AuthorizationModel from '../model/AuthorizationModel';

export default class AuthorizationController {
  view: AuthorizationView;

  model: AuthorizationModel;

  constructor(view: AuthorizationView, model: AuthorizationModel) {
    this.view = view;
    this.model = model;
  }

  start() {
    this.view.enterButton.node.addEventListener('click', this.enterButtonHandler);
    this.view.regButton.node.addEventListener('click', this.regButtonHandler);
    this.view.signIn.authButton.node.addEventListener('click', this.signInButtonHandler);
    this.view.signUp.regButton.node.addEventListener('click', this.signUpButtonHandler);
    this.view.closeButton.node.addEventListener('click', () => this.view.node.remove());
  }

  checkUser() {
    this.model.checkToken();
  }

  enterButtonHandler = () => {
    this.view.regButton.node.classList.remove('active');
    this.view.enterButton.node.classList.add('active');
    this.view.signUp.emailError.node.textContent = '';
    this.view.signUp.nameError.node.textContent = '';
    this.view.signUp.passError.node.textContent = '';
    this.view.signUp.node.remove();
    this.view.signIn.authForm.node.reset();
    this.view.node.append(this.view.signIn.node);
  };

  regButtonHandler = () => {
    this.view.enterButton.node.classList.remove('active');
    this.view.regButton.node.classList.add('active');
    this.view.signIn.emailError.node.textContent = '';
    this.view.signIn.passError.node.textContent = '';
    this.view.signIn.node.remove();
    this.view.signUp.regForm.node.reset();
    this.view.node.append(this.view.signUp.node);
  };

  signInButtonHandler = async (event: MouseEvent) => {
    event.preventDefault();
    const user = this.getAuthData();
    if (user) {
      const str = await this.model.logInUser(user);
      if (!str) {
        this.view.node.remove();
        this.model.updateToken();
      } else if (str === 'Пользователь с таким email не существует') {
        this.view.signIn.emailError.node.textContent = str;
        this.view.signIn.passError.node.textContent = '';
      } else if (str === 'Введен неправильный пароль') {
        this.view.signIn.emailError.node.textContent = '';
        this.view.signIn.passError.node.textContent = str;
      }
    }
  };

  signUpButtonHandler = async (event: MouseEvent) => {
    event.preventDefault();
    const user = this.getNewUser();
    if (user) {
      const str = await this.model.createUser(user);
      if (!str) {
        this.view.signUp.regForm.node.reset();
        this.view.signIn.authForm.node.reset();
        this.view.signUp.node.remove();
        this.view.node.append(this.view.signIn.node);
      } else if (str === 'Пользователь с таким email существует') {
        this.view.signUp.emailError.node.textContent = str;
      }
    }
  };

  getNewUser() {
    const name = this.view.signUp.nameInput.node.value;
    const email = this.view.signUp.emailInput.node.value;
    const password = this.view.signUp.passInput.node.value;
    const str = this.model.regDataValidate({ name, email, password });
    if (str === 'Укажите имя') {
      this.view.signUp.nameError.node.textContent = str;
    } else if (str === 'Невалидный email') {
      this.view.signUp.nameError.node.textContent = '';
      this.view.signUp.emailError.node.textContent = str;
    } else if (str === 'Длина пароля 8 символов') {
      this.view.signUp.emailError.node.textContent = '';
      this.view.signUp.passError.node.textContent = str;
    } else if (str === '') {
      return { name, email, password };
    }
  }

  getAuthData() {
    const email = this.view.signIn.emailInput.node.value;
    const password = this.view.signIn.passInput.node.value;
    const str = this.model.authDataValidate({ email, password });
    if (str === 'Невалидный email') {
      this.view.signIn.emailError.node.textContent = str;
    } else if (str === 'Пароль не может быть пустым') {
      this.view.signIn.emailError.node.textContent = '';
      this.view.signIn.passError.node.textContent = str;
    } else if (str === '') {
      return { email, password };
    }
  }
}
