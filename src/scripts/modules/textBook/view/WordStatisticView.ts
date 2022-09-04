import ElementTemplate from '../../../common/ElementTemplate';
import GamesStatistic from '../../../common/api/models/GamesStatistic.model';

class WordStatistic extends ElementTemplate {
  constructor(parentNode: HTMLElement, gamesStatistic: GamesStatistic) {
    super(parentNode, 'div', 'black-out');
    // const docBody = document.body;
    // const prevOverflow = docBody.style.overflow;
    // const prevPaddingRigh = docBody.style.paddingRight;
    // const widthWithScroll = docBody.clientWidth;
    // docBody.style.overflow = 'hidden';
    // const widthWithoutScroll = docBody.clientWidth;
    // docBody.style.paddingRight = `${widthWithoutScroll - widthWithScroll}px`;
    const popUp = new ElementTemplate(
      parentNode,
      'div',
      'pop-up',
      `<table class="pop-up__table">
       <thead>
         <tr>
           <th>Мини-игра</th>
           <th>Правильно</th>
           <th>Неправильно</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Спринт</td>
           <td>${gamesStatistic.sprint.correct}</td>
           <td>${gamesStatistic.sprint.wrong}</td>
         </tr>
         <tr>
           <td>Аудиовызов</td>
           <td>${gamesStatistic.audioCall.correct}</td>
           <td>${gamesStatistic.audioCall.wrong}</td>
         </tr>
       </tbody>
     </table>`,
    );
    const button = new ElementTemplate(popUp.node, 'button', 'pop-up__close-button');
    button.node.focus();
    const closeMessage = () => {
      // docBody.style.overflow = prevOverflow;
      // docBody.style.paddingRight = prevPaddingRigh;
      this.delete();
      popUp.delete();
    };
    button.node.onclick = closeMessage;
    this.node.onclick = closeMessage;
  }
}

export default WordStatistic;
