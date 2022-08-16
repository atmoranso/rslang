class ElementTemplate<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    if (parentNode) {
      parentNode.append(element);
    }
    this.node = element as NodeType;
  }

  delete(): void {
    this.node.remove();
  }
}

export default ElementTemplate;
