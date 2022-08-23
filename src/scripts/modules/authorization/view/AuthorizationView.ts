import ElementTemplate from '../../../common/ElementTemplate';
import SingInView from './SingInView';
import SingUpView from './SingUpView';

export default class AuthorizationView extends ElementTemplate {
  private singIn: SingInView;

  private singUp: SingUpView;

  private enterButton: ElementTemplate<HTMLButtonElement>;

  private regButton: ElementTemplate<HTMLButtonElement>;

  constructor(parentNode: HTMLElement | null) {
    super(parentNode);

    this.enterButton = new ElementTemplate(this.node, 'button', '', 'Войти');
    new ElementTemplate(this.node, 'span', '', 'или');
    this.regButton = new ElementTemplate(this.node, 'button', '', 'Зарегистрироваться');

    this.singIn = new SingInView(this.node);
    this.singUp = new SingUpView(null);

    this.showForm();
  }

  showForm() {
    this.enterButton.node.addEventListener('click', () => {
      this.singUp.node.remove();
      this.node.append(this.singIn.node);
    });
    this.regButton.node.addEventListener('click', () => {
      this.singIn.node.remove();
      this.node.append(this.singUp.node);
    });
  }
}
