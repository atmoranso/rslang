export default class ObserverBasic<ListenerType> {
  private listeners: Array<(params: ListenerType) => void>;

  constructor() {
    this.listeners = [];
  }

  subscribe(listener: (params: ListenerType) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (params: ListenerType) => void) {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  notify(params: ListenerType) {
    this.listeners.forEach((listener) => listener(params));
  }
}
