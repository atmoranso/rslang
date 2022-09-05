import ElementTemplate from './ElementTemplate';
import svg from './rs-school-logo.svg';

class FooterView extends ElementTemplate {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'footer', 'footer');
    const footerContainer = new ElementTemplate(this.node, 'div', 'footer__container');
    const logoLink = new ElementTemplate<HTMLAnchorElement>(footerContainer.node, 'a', 'footer__logo-link');
    logoLink.node.href = 'https://rs.school/js/';
    logoLink.node.target = '_blank';
    logoLink.node.innerHTML = svg;
    const githubsContainer = new ElementTemplate(footerContainer.node, 'div', 'footer__github-members github-members');
    githubsContainer.node.innerHTML = `
      <a class="github-members__member" href="https://github.com/redcliphaloe" target="_blank">@Redcliphaloe</a>
      <a class="github-members__member" href="https://github.com/atmoranso" target="_blank">@Atmoranso</a>
      <a class="github-members__member" href="https://github.com/Kirsawka" target="_blank">@Kirsawka</a>
    `;
    new ElementTemplate(footerContainer.node, 'span', 'footer__copyright', '© RSLang, 2022');
  }
}

export default FooterView;
