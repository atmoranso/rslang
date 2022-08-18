import ElementTemplate from '../../../common/ElementTemplate';

const projectSections = [
  {
    title: 'Словарь',
    img: 'https://via.placeholder.com/250',
    about: 'Коллекция содержит 3600 часто употребляемых английских слов',
  },
  {
    title: 'Мини-игра Аудиовызов',
    img: 'https://via.placeholder.com/250',
    about: 'Качаем навык перевода на слух',
  },
  {
    title: 'Мини-игра Спринт',
    img: 'https://via.placeholder.com/250',
    about: 'Тренировка на скорость, угадай как можно больше слов за 1 минуту',
  },
  {
    title: 'Статистика',
    img: 'https://via.placeholder.com/250',
    about: 'Статистика, прогресс изучения',
  },
];

const developers = [
  {
    title: 'Артем',
    img: 'https://via.placeholder.com/200?text=аватарка',
    subtitle: 'Developer',
    about: 'Разработал ... Принял активное участие... Помог в том-то...',
    githubName: '@redcliphaloe',
    githubLink: 'https://github.com/redcliphaloe',
  },
  {
    title: 'Андрей',
    img: 'https://via.placeholder.com/200?text=аватарка',
    subtitle: 'TeamLead and Developer',
    about: 'Разработал ... Принял активное участие... Помог в том-то...',
    githubName: '@atmoranso',
    githubLink: 'https://github.com/atmoranso',
  },
  {
    title: 'Анастасия',
    img: 'https://via.placeholder.com/200?text=аватарка',
    subtitle: 'Developer',
    about: 'Разработал ... Принял активное участие... Помог в том-то...',
    githubName: '@Kirsawka',
    githubLink: 'https://github.com/Kirsawka',
  },
];

class View extends ElementTemplate {
  private section: ElementTemplate<HTMLElement> | undefined;

  private container: ElementTemplate<HTMLElement> | undefined;

  private contentWrapper: ElementTemplate<HTMLImageElement> | undefined;

  private subtitle: ElementTemplate<HTMLElement> | undefined;

  private image: ElementTemplate<HTMLImageElement> | undefined;

  private list: ElementTemplate<HTMLElement> | undefined;

  private githubLink: ElementTemplate<HTMLLinkElement> | undefined;

  static TextContent = {
    GreetSubitle: 'Приветствуем тебя, друг!',
    GreetText:
      'RS Lang – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, ' +
      'мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса. ' +
      'Здесь ты найдешь много интересного...',
    AboutSubitle: 'О проекте',
    DevSubitle: 'О команде',
  };

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main');
  }

  getGreetSection() {
    this.section = new ElementTemplate(null, 'section', 'section greet-section');
    this.container = new ElementTemplate(this.section.node, 'div', 'container greet-section-container');
    this.contentWrapper = new ElementTemplate(this.container.node, 'div', 'content-wrapper');
    new ElementTemplate(this.contentWrapper.node, 'h2', 'section__subtitle', View.TextContent.GreetSubitle);
    new ElementTemplate(this.contentWrapper.node, 'p', 'section__content', View.TextContent.GreetText);
    this.image = new ElementTemplate(this.container.node, 'img', 'section__img');
    this.image.node.src = 'https://via.placeholder.com/700x400?text=Главная картинка';
    this.image.node.alt = 'greeting image';
    return this.section.node;
  }

  getSection(array: Array<{ [key: string]: string }>, className: string, textContent: string) {
    this.section = new ElementTemplate(null, 'section', `section ${className}`);
    this.container = new ElementTemplate(this.section.node, 'div', 'container');
    this.subtitle = new ElementTemplate(this.container.node, 'h2', 'section__subtitle', textContent);
    this.list = new ElementTemplate(this.container.node, 'ul', 'list');
    const listItems = this.getListContent(array);
    this.list.node.append(...listItems);
    return this.section.node;
  }

  getListContent(array: Array<{ [key: string]: string }>) {
    const listItems = [];
    for (let i = 0; i < array.length; i++) {
      const listItem = new ElementTemplate(null, 'li', 'list__item item');
      new ElementTemplate(listItem.node, 'h3', 'item__subtitle', array[i].title);
      this.image = new ElementTemplate(listItem.node, 'img', 'item__img');
      this.image.node.src = array[i].img;
      if (array[i].subtitle) {
        new ElementTemplate(listItem.node, 'p', 'item__content', array[i].subtitle);
      }
      new ElementTemplate(listItem.node, 'p', 'item__content', array[i].about);
      if (array[i].githubName) {
        this.githubLink = new ElementTemplate(listItem.node, 'a', 'item__link', `Github: ${array[i].githubName}`);
        this.githubLink.node.href = array[i].githubLink;
        this.githubLink.node.target = '_blank';
      }
      listItems.push(listItem.node);
    }
    return listItems;
  }

  renderHomePage() {
    this.node.append(this.getGreetSection());
    this.node.append(this.getSection(projectSections, 'about-section', View.TextContent.AboutSubitle));
    this.node.append(this.getSection(developers, 'developers-section', View.TextContent.DevSubitle));
  }
}

export default View;
