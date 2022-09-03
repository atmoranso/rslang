import ElementTemplate from './ElementTemplate';
import personSvg from './person-svg.svg';
import exitSvg from './exit-svg.svg';

class HeaderView extends ElementTemplate {
  logoAccount: ElementTemplate;

  logIn: ElementTemplate;

  logOut: ElementTemplate;

  burger: ElementTemplate;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');
    const headerContainer = new ElementTemplate(this.node, 'div', 'header__container');
    this.burger = new ElementTemplate(headerContainer.node, 'div', 'header__burger');
    new ElementTemplate(this.burger.node, 'span', 'header__burger-line');
    const overlay = new ElementTemplate(headerContainer.node, 'div', 'header__overlay');
    const mainLogo = new ElementTemplate<HTMLAnchorElement>(headerContainer.node, 'a', 'header__logo');
    mainLogo.node.href = '/';
    new ElementTemplate(mainLogo.node, 'h1', 'header__title', 'RSLang');
    const nav = new ElementTemplate(headerContainer.node, 'nav', 'header__nav nav');
    const navMenu = new ElementTemplate(nav.node, 'ul', 'nav__list nav-menu');
    navMenu.node.innerHTML = `
      <li class="nav-menu__item"><a class="nav-menu__link" href="/">Главная</a></li>
      <li class="nav-menu__item"><a class="nav-menu__link" href="#textbook">Учебник</a></li>
      <li class="nav-menu__item dropdown">
        <div class="dropdown__container">
          <span class="dropdown__subtitle">Игры</span>
          <span class="dropdown__icon">&#9660;</span>
        </div>
        <ul class="dropdown__list dropdown-menu">
          <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#sprint">Спринт</a></li>
          <li class="dropdown-menu__item"><a class="dropdown-menu__link" href="#audiocall">Аудиовызов</a></li>
        </ul>
      </li>
      <li class="nav-menu__item"><a class="nav-menu__link" href="#statistics">Статистика</a></li>
    `;
    this.logoAccount = new ElementTemplate(headerContainer.node, 'div', 'header__account');
    this.logIn = new ElementTemplate(null, 'div', 'header__log-in');
    this.logOut = new ElementTemplate(null, 'div', 'header__log-out');
  }

  showLogInIcon() {
    this.logOut.node.remove();
    this.logIn.node.innerHTML = personSvg;
    this.logoAccount.node.append(this.logIn.node);
  }

  showLogOutIcon(name: string) {
    this.logIn.node.remove();
    this.logOut.node.innerHTML = '';
    new ElementTemplate(this.logOut.node, 'span', 'header__name', name);
    this.logOut.node.insertAdjacentHTML('beforeend', exitSvg);
    this.logoAccount.node.append(this.logOut.node);
  }
}

export default HeaderView;
