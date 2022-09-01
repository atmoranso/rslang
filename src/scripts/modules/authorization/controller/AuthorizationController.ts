import AuthorizationView from '../view/AuthorizationView';
import AuthorizationModel from '../model/AuthorizationModel';
import HeaderView from '../../../common/HeaderView';

export default class AuthorizationController {
  view: AuthorizationView;

  header: HeaderView | undefined;

  model: AuthorizationModel;

  constructor(view: AuthorizationView, model: AuthorizationModel) {
    this.view = view;
    this.model = model;
  }

  start(header: HeaderView) {
    this.header = header;
    this.header.logoAccount.node.addEventListener('click', this.clickLogoAccHandler);
    this.checkUser().then((isAuth) => {
      if (isAuth) this.header?.logoAccount.node.removeEventListener('click', this.clickLogoAccHandler);
    });
    this.view.enterButton.node.addEventListener('click', this.enterButtonHandler);
    this.view.regButton.node.addEventListener('click', this.regButtonHandler);
    this.view.signIn.authButton.node.addEventListener('click', this.signInButtonHandler);
    this.view.signUp.regButton.node.addEventListener('click', this.signUpButtonHandler);
    this.view.closeButton.node.addEventListener('click', () => this.view.node.remove());
  }

  async checkUser() {
    const isUserAuth = await this.model.checkToken();
    return isUserAuth;
  }

  clickLogoAccHandler = () => {
    this.header?.node.append(this.view.node);
  };

  enterButtonHandler = () => {
    this.view.showSignInWindow();
  };

  regButtonHandler = () => {
    this.view.showSignUpWindow();
  };

  signInButtonHandler = async (event: MouseEvent) => {
    event.preventDefault();
    const user = this.getAuthData();
    if (user) {
      const str = await this.model.logInUser(user);
      this.view.showSignInErrors(str);
      if (!str) this.model.updateToken();
    }
  };

  signUpButtonHandler = async (event: MouseEvent) => {
    event.preventDefault();
    const user = this.getNewUserData();
    if (user) {
      const str = await this.model.createUser(user);
      this.view.showSignUpErrors(str);
    }
  };

  getNewUserData() {
    const name = this.view.signUp.nameInput.node.value;
    const email = this.view.signUp.emailInput.node.value;
    const password = this.view.signUp.passInput.node.value;
    const str = this.model.regDataValidate({ name, email, password });
    if (str === '') {
      return { name, email, password };
    }
    this.view.showGetNewUserErrors(str);
  }

  getAuthData() {
    const email = this.view.signIn.emailInput.node.value;
    const password = this.view.signIn.passInput.node.value;
    const str = this.model.authDataValidate({ email, password });
    if (str === '') {
      return { email, password };
    }
    this.view.showGetAuthDataErrors(str);
  }
}
