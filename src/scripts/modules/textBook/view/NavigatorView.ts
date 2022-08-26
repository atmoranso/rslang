import ElementTemplate from '../../../common/ElementTemplate';

export default class NavigatorView extends ElementTemplate {
  private state = { group: 1, page: 1 };

  private groupButtons: ElementTemplate[] = [];

  private pagesCount = 30;

  private pageButtonFirst: ElementTemplate<HTMLButtonElement>;

  private pageButtonPrev: ElementTemplate<HTMLButtonElement>;

  private pageCurrent: ElementTemplate;

  private pageButtonNext: ElementTemplate<HTMLButtonElement>;

  private pageButtonLast: ElementTemplate<HTMLButtonElement>;

  public navigatorOnChange: (state: { group: number; page: number }) => void;

  constructor(parentNode: HTMLElement, navigatorOnChange: (state: { group: number; page: number }) => void) {
    super(parentNode, 'div', 'navigator');
    this.navigatorOnChange = navigatorOnChange;

    const groupsCount = 6;
    const groupNumbers = [...Array(groupsCount).keys()].map((x) => (x += 1));
    const groups = new ElementTemplate(this.node, 'div', 'navigator__groups', 'Группы:');
    groupNumbers.forEach((el, i) => {
      const groupButton = new ElementTemplate(groups.node, 'button', `navigator__group-button-${i + 1}`, `${i + 1}`);
      this.groupButtons.push(groupButton);
    });

    const pages = new ElementTemplate(this.node, 'div', 'navigator__pages', 'Страницы:');
    this.pageButtonFirst = new ElementTemplate(pages.node, 'button', 'navigator__page-button-first', 'First');
    this.pageButtonPrev = new ElementTemplate(pages.node, 'button', 'navigator__page-button-prev', 'Prev');
    this.pageCurrent = new ElementTemplate(pages.node, 'span', 'navigator__page-current');
    this.pageButtonNext = new ElementTemplate(pages.node, 'button', 'navigator__page-button-next', 'Next');
    this.pageButtonLast = new ElementTemplate(pages.node, 'button', 'navigator__page-button-last', 'Last');

    this.loadState();
    this.groupesInit();
    this.pagesInit();
  }

  private loadState() {
    const storagedState = localStorage.getItem('lang-navigator-state');
    if (storagedState !== null) {
      this.state = JSON.parse(storagedState);
    }
    this.navigatorOnChange(this.state);
  }

  private saveState() {
    localStorage.setItem('lang-navigator-state', JSON.stringify(this.state));
    this.navigatorOnChange(this.state);
  }

  private setCurrentGroup(groupButton: ElementTemplate, index: number) {
    if (this.state.group === index + 1) {
      groupButton.node.classList.add('navigator__group-button_active');
    } else {
      groupButton.node.classList.remove('navigator__group-button_active');
    }
  }

  private groupesInit() {
    this.groupButtons.forEach((el, i) => {
      this.setCurrentGroup(el, i);
      el.node.addEventListener('click', () => {
        this.state.group = i + 1;
        this.saveState();
        this.groupButtons.forEach((elem, index) => {
          this.setCurrentGroup(elem, index);
        });
      });
    });
  }

  private setCurrentPage() {
    this.pageCurrent.node.innerHTML = this.state.page.toString();
  }

  private setAblePageButtons() {
    this.pageButtonFirst.node.disabled = this.state.page === 1;
    this.pageButtonPrev.node.disabled = this.state.page === 1;
    this.pageButtonNext.node.disabled = this.state.page === this.pagesCount;
    this.pageButtonLast.node.disabled = this.state.page === this.pagesCount;
  }

  private onClickPageButtons() {
    this.setCurrentPage();
    this.setAblePageButtons();
    this.saveState();
  }

  private pagesInit() {
    this.setCurrentPage();
    this.setAblePageButtons();
    this.pageButtonFirst.node.addEventListener('click', () => {
      if (this.pageButtonFirst.node.disabled !== true) {
        this.state.page = 1;
      }
      this.onClickPageButtons();
    });
    this.pageButtonPrev.node.addEventListener('click', () => {
      if (this.pageButtonPrev.node.disabled !== true) {
        this.state.page -= 1;
      }
      this.onClickPageButtons();
    });
    this.pageButtonNext.node.addEventListener('click', () => {
      if (this.pageButtonNext.node.disabled !== true) {
        this.state.page += 1;
      }
      this.onClickPageButtons();
    });
    this.pageButtonLast.node.addEventListener('click', () => {
      if (this.pageButtonLast.node.disabled !== true) {
        this.state.page = this.pagesCount;
      }
      this.onClickPageButtons();
    });
  }
}
