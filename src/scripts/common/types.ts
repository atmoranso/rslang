import ElementTemplate from './ElementTemplate';
import { AppState } from './stateTypes';

class ModuleClass {
  state: AppState;
  constructor(state: AppState) {
    this.state = state;
  }
}
// interface Module наследуется теперь от класса ModuleClass. Сделано для того, чтобы конструктор воткнуть в интерфейс
export interface Module extends ModuleClass {
  view: ElementTemplate;
  start: () => void;
}
