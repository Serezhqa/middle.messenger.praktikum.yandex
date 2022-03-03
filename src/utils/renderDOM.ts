import Block from './Block';

export default function renderDOM(selector: string, component: Block) {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error('Root not found');
  }

  root.innerHTML = '';

  root.appendChild(component.getContent()!);

  component.dispatchComponentDidMount();

  return root;
}
