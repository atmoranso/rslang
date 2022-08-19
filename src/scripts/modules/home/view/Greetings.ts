import ElementTemplate from '../../../common/ElementTemplate';

export default class Greetings extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section greet');
    const greetingContent = `
        <div class="greet__text-container">
                    <h2 class="greet__text-title">Приветствуем тебя, друг!</h2>
                    <p class="greet__text-content">RS Lang – приложение для изучения иностранных слов,
                     включающее электронный учебник с базой слов для изучения, мини-игры для их повторения,
                      страницу статистики для отслеживания индивидуального прогресса. Здесь ты найдешь много интересного...</p>
        </div>
        <img src="https://via.placeholder.com/700x400?text=Главная картинка" alt="greeting image" class="greet__img">`;

    this.node.innerHTML = greetingContent;
  }
}
