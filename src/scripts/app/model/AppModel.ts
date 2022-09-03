export default class AppModel {
  toggleOpenLockClasses(burger: HTMLElement, menu: HTMLElement, overlay: HTMLElement) {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.classList.toggle('lock');
  }
}
