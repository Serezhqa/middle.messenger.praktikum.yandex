import Block from '../../utils/Block';
import template from './modal.hbs';
import './modal.scss';

export default class Modal extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

export const clickHandler = (event: PointerEvent) => {
  if (event.target && event.target === event.currentTarget) {
    (event.target as HTMLDivElement).classList.remove('modal_opened');
  }
};

export const fileInputChangeHandler = (event: InputEvent) => {
  const inputElement = event.target as HTMLInputElement;
  const filename = inputElement.value.replace('C:\\fakepath\\', '');

  const modal = inputElement.closest('.modal') as HTMLDivElement;

  const modalTitleElement = modal.querySelector('.modal__title');
  const labelElement = modal.querySelector('.modal__file-label');
  const filenameElement = modal.querySelector('.modal__filename');

  if (modalTitleElement) {
    modalTitleElement.textContent = 'Файл загружен';
  }

  if (filenameElement && labelElement) {
    labelElement.classList.add('modal__file-label_hidden');
    filenameElement.textContent = filename;
    filenameElement.classList.add('modal__filename_visible');
  }
};
