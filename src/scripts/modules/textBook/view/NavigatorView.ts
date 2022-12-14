import ElementTemplate from '../../../common/ElementTemplate';
import { AppState } from '../../../common/stateTypes';

export default class NavigatorView extends ElementTemplate {
  private groupButtons: ElementTemplate[] = [];

  private groupsMaxCount;

  private groupsCount;

  private pagesCount = 30;

  private sprintLink: ElementTemplate;

  private pageButtonFirst: ElementTemplate<HTMLButtonElement>;

  private pageButtonPrev: ElementTemplate<HTMLButtonElement>;

  private pageCurrent: ElementTemplate;

  private pageButtonNext: ElementTemplate<HTMLButtonElement>;

  private pageButtonLast: ElementTemplate<HTMLButtonElement>;

  private audioCallLink: ElementTemplate;

  private state: AppState;

  private navigatorButtonsData = ['A1', 'A2', 'В1', 'В2', 'С1', 'С2', 'D'];

  public navigatorOnChange: () => void;

  constructor(parentNode: HTMLElement, groupsMaxCount: number, state: AppState, navigatorOnChange: () => void) {
    super(parentNode, 'div', 'navigator');
    this.state = state;
    this.navigatorOnChange = navigatorOnChange;
    this.groupsMaxCount = groupsMaxCount;
    if (!this.state.authorization.isAuth && this.state.textbook.group === this.groupsMaxCount) {
      this.state.textbook.group = 1;
      this.saveState();
    }
    this.groupsCount = this.state.authorization.isAuth ? this.groupsMaxCount : this.groupsMaxCount - 1;
    const groupNumbers = [...Array(this.groupsCount).keys()].map((x) => (x += 1));
    const buttonsWrapper = new ElementTemplate(this.node, 'div', 'navigator__buttons-wrapper');
    const groups = new ElementTemplate(buttonsWrapper.node, 'div', 'navigator__groups');
    groupNumbers.forEach((el, i) => {
      const groupButton = new ElementTemplate(
        groups.node,
        'button',
        `navigator__group-button-${i + 1} btn`,
        `${this.navigatorButtonsData[i]}`,
      );
      this.groupButtons.push(groupButton);
    });
    const pages = new ElementTemplate(buttonsWrapper.node, 'div', 'navigator__pages');
    this.sprintLink = new ElementTemplate(pages.node, 'div', 'navigator__game-link');
    this.sprintLink.node.innerHTML = '<a class="navigator__link" href="#sprint?textbook">Спринт</a>';
    this.pageButtonFirst = new ElementTemplate(pages.node, 'button', 'navigator__page-button-first btn', '<<');
    this.pageButtonPrev = new ElementTemplate(pages.node, 'button', 'navigator__page-button-prev btn', '<');
    this.pageCurrent = new ElementTemplate(pages.node, 'span', 'navigator__page-current');
    this.pageButtonNext = new ElementTemplate(pages.node, 'button', 'navigator__page-button-next btn', '>');
    this.pageButtonLast = new ElementTemplate(pages.node, 'button', 'navigator__page-button-last btn', '>>');
    this.audioCallLink = new ElementTemplate(pages.node, 'div', 'navigator__game-link');
    this.audioCallLink.node.innerHTML = '<a class="navigator__link" href="#audiocall?textbook">Аудиовызов</a>';
    this.navigatorOnChange();
    this.groupesInit();
    this.pagesInit();
  }

  public displayMedal = (visible: boolean) => {
    if (visible) {
      this.pageCurrent.node.classList.add('navigator__page-current_show-medal');
      this.sprintLink.node.style.visibility = 'hidden';
      this.audioCallLink.node.style.visibility = 'hidden';
      this.node.classList.add('navigator__fill');
    } else {
      this.pageCurrent.node.classList.remove('navigator__page-current_show-medal');
      this.sprintLink.node.style.visibility = 'visible';
      this.audioCallLink.node.style.visibility = 'visible';
      this.node.classList.remove('navigator__fill');
    }
  };

  private saveState = () => {
    localStorage.setItem('rsLang-appState-DT', JSON.stringify(this.state));
  };

  private setCurrentGroup = (groupButton: ElementTemplate, index: number) => {
    if (this.state.textbook.group === index + 1) {
      groupButton.node.classList.add('navigator__group-button_active');
    } else {
      groupButton.node.classList.remove('navigator__group-button_active');
    }
  };

  private groupesInit = () => {
    this.groupButtons.forEach((el, i) => {
      this.setCurrentGroup(el, i);
      el.node.addEventListener('click', () => {
        this.state.textbook.group = i + 1;
        this.state.textbook.page = 1;
        this.onClickPageButtons();
        this.groupButtons.forEach((elem, index) => {
          this.setCurrentGroup(elem, index);
        });
      });
    });
  };

  private setCurrentPage = () => {
    this.pageCurrent.node.innerHTML = this.state.textbook.page.toString();
  };

  private setAblePageButtons = () => {
    this.pageButtonFirst.node.disabled = this.state.textbook.page === 1;
    this.pageButtonPrev.node.disabled = this.state.textbook.page === 1;
    this.pageButtonNext.node.disabled = this.state.textbook.page === this.pagesCount;
    this.pageButtonLast.node.disabled = this.state.textbook.page === this.pagesCount;
    if (this.state.textbook.group === this.groupsMaxCount) {
      this.pageButtonFirst.node.disabled = true;
      this.pageButtonPrev.node.disabled = true;
      this.pageButtonNext.node.disabled = true;
      this.pageButtonLast.node.disabled = true;
    }
  };

  private onClickPageButtons = () => {
    this.displayMedal(false);
    this.setCurrentPage();
    this.setAblePageButtons();
    this.saveState();
    this.navigatorOnChange();
  };

  private pageButtonFirstOnClick = () => {
    if (this.pageButtonFirst.node.disabled !== true) {
      this.state.textbook.page = 1;
    }
    this.onClickPageButtons();
  };

  private pageButtonPrevOnClick = () => {
    if (this.pageButtonPrev.node.disabled !== true) {
      this.state.textbook.page -= 1;
    }
    this.onClickPageButtons();
  };

  private pageButtonNextOnClick = () => {
    if (this.pageButtonNext.node.disabled !== true) {
      this.state.textbook.page += 1;
    }
    this.onClickPageButtons();
  };

  private pageButtonLastOnClick = () => {
    if (this.pageButtonLast.node.disabled !== true) {
      this.state.textbook.page = this.pagesCount;
    }
    this.onClickPageButtons();
  };

  private pagesInit = () => {
    this.setCurrentPage();
    this.setAblePageButtons();
    this.pageButtonFirst.node.addEventListener('click', this.pageButtonFirstOnClick);
    this.pageButtonPrev.node.addEventListener('click', this.pageButtonPrevOnClick);
    this.pageButtonNext.node.addEventListener('click', this.pageButtonNextOnClick);
    this.pageButtonLast.node.addEventListener('click', this.pageButtonLastOnClick);
  };
}
