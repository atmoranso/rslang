// в этом варианте мы импортируем статичный HTML из файла и вставляем его прямо в наш создаваемый объект
// на ошибку тут внимания не обращайте, нужный модуль для возможности импорта не делал, чтоб конфиг не править, т.к. это только пример
import ElementTemplate from '../../../common/ElementTemplate';
import aboutTemplate from './about.template';

export default class About extends ElementTemplate {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'section about', aboutTemplate);
  }
}
