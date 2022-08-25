import ElementTemplate from './ElementTemplate';
import svg from './person-svg.svg';

class HeaderView extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');
    const headerContainer = new ElementTemplate(this.node, 'div', 'header__container');
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
    const logoAccount = new ElementTemplate(headerContainer.node, 'div', 'header__account');
    logoAccount.node.innerHTML = svg;
  }
}

export default HeaderView;
