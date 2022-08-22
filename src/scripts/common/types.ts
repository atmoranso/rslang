import ElementTemplate from './ElementTemplate';

export interface Module {
  view: ElementTemplate;
  start: () => void;
}
