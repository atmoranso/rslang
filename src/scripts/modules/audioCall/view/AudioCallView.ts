import ElementTemplate from '../../../common/ElementTemplate';

export default class AudioCallView extends ElementTemplate {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'div', '', 'Аудиовызов');
  }
}
